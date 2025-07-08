/**
 * Cliente Algolia simplificado para compatibilidade
 * Wrapper para trabalhar com diferentes versões da API Algolia
 */

// Mock client para desenvolvimento sem Algolia configurado
export const mockSearchClient = {
  search: async (queries: any[]) => {
    console.log('Mock search called with:', queries);
    return {
      results: queries.map(() => ({
        hits: [],
        nbHits: 0,
        page: 0,
        nbPages: 0,
        hitsPerPage: 20,
        exhaustiveNbHits: true,
        query: '',
        params: '',
        processingTimeMS: 10,
        facets: {},
      })),
    };
  },
};

// Cliente de busca que funciona com ou sem Algolia
export const safeSearchClient =
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
    ? null // Será substituído pelo client real quando disponível
    : mockSearchClient;

// Configurações de busca simplificadas
export const SEARCH_INDICES = {
  produtos: 'produtos',
  associacoes: 'associacoes',
} as const;

// Interface simplificada para resultados
export interface SimpleSearchResult {
  hits: any[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
  facets?: Record<string, Record<string, number>>;
}

// Interface para opções de busca simplificadas
export interface SimpleSearchOptions {
  query?: string;
  page?: number;
  hitsPerPage?: number;
  filters?: string;
  facets?: string[];
}

/**
 * Função de busca simplificada
 */
export async function simpleSearch(
  indexName: string,
  options: SimpleSearchOptions = {}
): Promise<SimpleSearchResult | null> {
  try {
    const client = safeSearchClient;
    if (!client) {
      console.warn('Cliente de busca não disponível');
      return null;
    }

    const searchQuery = {
      indexName,
      query: options.query || '',
      page: options.page || 0,
      hitsPerPage: options.hitsPerPage || 20,
      filters: options.filters,
      facets: options.facets,
    };

    const { results } = await client.search([searchQuery]);
    return results[0] as SimpleSearchResult;
  } catch (error) {
    console.error('Erro na busca:', error);
    return null;
  }
}

/**
 * Busca de produtos simplificada
 */
export async function searchProdutosSimple(options: SimpleSearchOptions = {}) {
  return simpleSearch(SEARCH_INDICES.produtos, options);
}

/**
 * Busca de associações simplificada
 */
export async function searchAssociacoesSimple(
  options: SimpleSearchOptions = {}
) {
  return simpleSearch(SEARCH_INDICES.associacoes, options);
}

/**
 * Gerar filtros Algolia simplificado
 */
export function buildSimpleFilters(filters: Record<string, any>): string {
  const filterStrings: string[] = [];

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      const filterGroup = value.map((v) => `${key}:"${v}"`).join(' OR ');
      filterStrings.push(`(${filterGroup})`);
    } else if (typeof value === 'string') {
      filterStrings.push(`${key}:"${value}"`);
    } else if (typeof value === 'number') {
      filterStrings.push(`${key}:${value}`);
    }
  });

  return filterStrings.join(' AND ');
}

/**
 * Mock para facetas quando Algolia não está disponível
 */
export function getMockFacets(facetName: string): Record<string, number> {
  const mockData: Record<string, Record<string, number>> = {
    categoria: {
      Decoração: 25,
      Vestuário: 18,
      Acessórios: 12,
      Cozinha: 8,
    },
    disponibilidade: {
      DISPONIVEL: 45,
      SOB_ENCOMENDA: 15,
      ESGOTADO: 3,
    },
    'associacao.cidade': {
      Jaguaribe: 35,
      Fortaleza: 20,
      Sobral: 8,
    },
  };

  return mockData[facetName] || {};
}
