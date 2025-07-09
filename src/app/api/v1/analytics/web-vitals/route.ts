import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import CacheManager from '@/lib/cache';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar dados
    const requiredFields = ['name', 'value', 'rating', 'id', 'url'];
    for (const field of requiredFields) {
      if (!(field in data)) {
        return NextResponse.json(
          { error: `Campo obrigatório: ${field}` },
          { status: 400 }
        );
      }
    }

    // Obter informações do usuário
    const userAgent = request.headers.get('user-agent') || '';
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Salvar no banco de dados
    await prisma.webVitals.create({
      data: {
        name: data.name,
        value: data.value,
        rating: data.rating,
        delta: data.delta || 0,
        metricId: data.id,
        navigationType: data.navigationType || 'navigate',
        url: data.url,
        userAgent,
        ipAddress: ip,
        timestamp: new Date(data.timestamp || Date.now()),
      },
    });

    // Cache das métricas agregadas (invalidar)
    const cache = CacheManager.getInstance();
    await cache.del('analytics:web-vitals:summary');
    await cache.del('analytics:web-vitals:daily');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar Web Vitals:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    const metric = searchParams.get('metric');

    const cache = CacheManager.getInstance();
    const cacheKey = `analytics:web-vitals:${period}:${metric || 'all'}`;

    // Tentar buscar do cache
    const cached = await cache.get(cacheKey);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Calcular data de início baseado no período
    const now = new Date();
    const startDate = new Date();

    switch (period) {
      case '1d':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Query base
    const whereClause: any = {
      timestamp: {
        gte: startDate,
      },
    };

    if (metric) {
      whereClause.name = metric;
    }

    // Buscar dados
    const data = await prisma.webVitals.findMany({
      where: whereClause,
      orderBy: {
        timestamp: 'desc',
      },
      take: 1000, // Limitar resultados
    });

    // Calcular estatísticas
    const stats = calculateStats(data);

    const result = {
      period,
      total: data.length,
      stats,
      data: data.slice(0, 100), // Retornar apenas os 100 mais recentes
    };

    // Cache por 15 minutos
    await cache.set(cacheKey, result, { ttlMinutes: 15 });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Erro ao buscar Web Vitals:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

function calculateStats(data: any[]) {
  if (data.length === 0) {
    return {};
  }

  const metricGroups = data.reduce(
    (acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item.value);
      return acc;
    },
    {} as Record<string, number[]>
  );

  const stats: Record<string, any> = {};

  for (const [metric, values] of Object.entries(metricGroups)) {
    const sorted = (values as number[]).sort((a, b) => a - b);
    const count = (values as number[]).length;

    stats[metric] = {
      count,
      avg: (values as number[]).reduce((sum, val) => sum + val, 0) / count,
      min: sorted[0],
      max: sorted[count - 1],
      p50: sorted[Math.floor(count * 0.5)],
      p75: sorted[Math.floor(count * 0.75)],
      p90: sorted[Math.floor(count * 0.9)],
      p95: sorted[Math.floor(count * 0.95)],
    };

    // Calcular distribuição por rating
    const ratings = data
      .filter((item) => item.name === metric)
      .reduce(
        (acc, item) => {
          acc[item.rating] = (acc[item.rating] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

    stats[metric].ratings = ratings;
  }

  return stats;
}
