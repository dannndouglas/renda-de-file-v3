import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity/client';
import { PRODUTOS_QUERY } from '@/lib/sanity/queries';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const disponibilidade = searchParams.get('disponibilidade');
    const associacaoId = searchParams.get('associacao');
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

    const produtos = await sanityClient.fetch(query, params);

    return NextResponse.json({
      produtos,
      pagination: {
        offset,
        limit,
        hasMore: produtos.length === limit,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
