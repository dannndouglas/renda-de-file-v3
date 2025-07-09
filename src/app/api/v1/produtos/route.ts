import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';
import { PRODUTOS_QUERY } from '@/lib/sanity/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const disponibilidade = searchParams.get('disponibilidade');
    const associacaoId = searchParams.get('associacao');
    const destaque = searchParams.get('destaque');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = PRODUTOS_QUERY;
    const params: any = {};

    // Aplicar filtros
    const filters = [];

    if (categoria) {
      filters.push('categoria == $categoria');
      params.categoria = categoria;
    }

    if (disponibilidade) {
      filters.push('disponibilidade == $disponibilidade');
      params.disponibilidade = disponibilidade;
    }

    if (associacaoId) {
      filters.push('associacao._ref == $associacaoId');
      params.associacaoId = associacaoId;
    }

    if (destaque === 'true') {
      filters.push('destaque == true');
    }

    // Modificar query se houver filtros
    if (filters.length > 0) {
      query = query.replace(
        '*[_type == "produto"]',
        `*[_type == "produto" && ${filters.join(' && ')}]`
      );
    }

    // Adicionar paginação
    query = query.replace(
      '| order(_createdAt desc)',
      `| order(_createdAt desc) [${offset}...${offset + limit}]`
    );

    console.log('[PRODUTOS_API] Query:', query);
    console.log('[PRODUTOS_API] Params:', params);

    const produtos = await sanityClient.fetch(query, params);

    console.log('[PRODUTOS_API] Produtos encontrados:', produtos.length);

    return NextResponse.json({
      success: true,
      data: produtos,
      total: produtos.length,
      pagination: {
        offset,
        limit,
        hasMore: produtos.length === limit,
      },
    });
  } catch (error) {
    console.error('[PRODUTOS_API] Erro ao buscar produtos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        message: 'Falha ao carregar produtos',
      },
      { status: 500 }
    );
  }
}
