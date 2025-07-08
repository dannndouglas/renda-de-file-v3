/**
 * Cliente Algolia para busca avançada
 * Configuração e utilitários para integração com Algolia
 */

import { algoliasearch } from 'algoliasearch';

// Verificar se as variáveis de ambiente estão disponíveis
if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
  console.warn('NEXT_PUBLIC_ALGOLIA_APP_ID não configurado');
}

if (!process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY) {
  console.warn('NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY não configurado');
}

// Cliente de busca para o frontend (somente leitura)
export const searchClient =
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID &&
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
    ? algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
      )
    : null;

// Cliente admin para o backend (escrita)
export const adminClient =
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && process.env.ALGOLIA_ADMIN_API_KEY
    ? algoliasearch(
        process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        process.env.ALGOLIA_ADMIN_API_KEY
      )
    : null;

// Nomes dos índices
export const INDICES = {
  produtos: 'produtos',
  associacoes: 'associacoes',
  noticias: 'noticias',
  eventos: 'eventos',
} as const;

// Configurações de busca
export const SEARCH_CONFIG = {
  // Atributos pesquisáveis (ordem de importância)
  searchableAttributes: [
    'nome',
    'descricao',
    'categoria',
    'tags',
    'associacao.nome',
    'associacao.cidade',
  ],

  // Atributos para facetas
  attributesForFaceting: [
    'categoria',
    'disponibilidade',
    'associacao.nome',
    'associacao.cidade',
    'preco.range',
  ],

  // Ranking personalizado
  customRanking: [
    'desc(popularidade)',
    'desc(disponibilidade)',
    'asc(preco.valor)',
  ],

  // Configurações de busca
  queryLanguages: ['pt'],
  highlightPreTag: '<mark>',
  highlightPostTag: '</mark>',

  // Paginação
  hitsPerPage: 20,
  maxValuesPerFacet: 100,

  // Tolerância a erros de digitação
  typoTolerance: true,
  minWordSizefor1Typo: 4,
  minWordSizefor2Typos: 8,

  // Busca exata
  exactOnSingleWordQuery: 'attribute',

  // Sinônimos e plurais
  ignorePlurals: ['portuguese'],

  // Filtros padrão
  filters: '',

  // Analytics
  analytics: true,
  analyticsTags: ['website'],
  clickAnalytics: true,
} as const;

// Configurações específicas para produtos
export const PRODUTOS_INDEX_SETTINGS = {
  ...SEARCH_CONFIG,
  searchableAttributes: [
    'nome',
    'descricao',
    'categoria',
    'tags',
    'associacao.nome',
    'associacao.cidade',
    'tecnica',
    'material',
  ],
  attributesForFaceting: [
    'categoria',
    'disponibilidade',
    'associacao.nome',
    'associacao.cidade',
    'preco.range',
    'tecnica',
    'material',
    'tamanho',
    'cor',
  ],
  customRanking: [
    'desc(popularidade)',
    'desc(disponibilidade_priority)',
    'asc(preco.valor)',
    'desc(created_at)',
  ],
};

// Configurações para associações
export const ASSOCIACOES_INDEX_SETTINGS = {
  ...SEARCH_CONFIG,
  searchableAttributes: [
    'nome',
    'descricao',
    'cidade',
    'endereco.bairro',
    'especialidades',
    'presidente.nome',
  ],
  attributesForFaceting: [
    'cidade',
    'ativa',
    'especialidades',
    'numero_artesas',
  ],
  customRanking: [
    'desc(ativa)',
    'desc(numero_artesas)',
    'desc(produtos_count)',
  ],
};

// Mapeamento de disponibilidade para prioridade
export const DISPONIBILIDADE_PRIORITY = {
  DISPONIVEL: 3,
  SOB_ENCOMENDA: 2,
  ESGOTADO: 1,
} as const;

// Tipos TypeScript
export type AlgoliaIndex = keyof typeof INDICES;
export type SearchFilters = {
  categoria?: string[];
  disponibilidade?: string[];
  associacao?: string[];
  cidade?: string[];
  preco_min?: number;
  preco_max?: number;
  tecnica?: string[];
  material?: string[];
  tamanho?: string[];
  cor?: string[];
};

export type SearchOptions = {
  query?: string;
  filters?: SearchFilters;
  page?: number;
  hitsPerPage?: number;
  facets?: string[];
  sortBy?: string;
  aroundLatLng?: string;
  aroundRadius?: number;
};

// Utilitário para construir filtros Algolia
export function buildAlgoliaFilters(filters: SearchFilters): string {
  const filterStrings: string[] = [];

  // Filtros de array (OR dentro de cada categoria)
  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      const filterGroup = value.map((v) => `${key}:"${v}"`).join(' OR ');
      filterStrings.push(`(${filterGroup})`);
    }
  });

  // Filtros de range numérico
  if (filters.preco_min !== undefined) {
    filterStrings.push(`preco.valor >= ${filters.preco_min}`);
  }
  if (filters.preco_max !== undefined) {
    filterStrings.push(`preco.valor <= ${filters.preco_max}`);
  }

  return filterStrings.join(' AND ');
}

// Utilitário para formatar dados do produto para Algolia
export function formatProdutoForAlgolia(produto: any) {
  return {
    objectID: produto._id,
    nome: produto.nome,
    slug: produto.slug?.current,
    descricao: produto.descricao,
    categoria: produto.categoria,
    tags: produto.tags || [],

    // Disponibilidade com prioridade
    disponibilidade: produto.disponibilidade,
    disponibilidade_priority:
      DISPONIBILIDADE_PRIORITY[
        produto.disponibilidade as keyof typeof DISPONIBILIDADE_PRIORITY
      ] || 0,

    // Preço estruturado
    preco: {
      valor: produto.preco || 0,
      range: getPriceRange(produto.preco || 0),
      formatado: formatPrice(produto.preco || 0),
    },

    // Informações da associação
    associacao: produto.associacao
      ? {
          _id: produto.associacao._id,
          nome: produto.associacao.nome,
          cidade: produto.associacao.endereco?.cidade || 'N/A',
        }
      : null,

    // Detalhes técnicos
    tecnica: produto.tecnica || 'Renda de Filé',
    material: produto.material || [],
    tamanho: produto.dimensoes?.tamanho || null,
    cor: produto.cor || [],

    // Imagens
    imagem_principal: produto.imagens?.[0] || null,

    // Metadados
    created_at: produto._createdAt,
    updated_at: produto._updatedAt,
    popularidade: produto.visualizacoes || 0,

    // Geolocalização (se disponível)
    _geoloc: produto.associacao?.endereco?.coordenadas
      ? {
          lat: produto.associacao.endereco.coordenadas.lat,
          lng: produto.associacao.endereco.coordenadas.lng,
        }
      : undefined,
  };
}

// Utilitário para formatar dados da associação para Algolia
export function formatAssociacaoForAlgolia(associacao: any) {
  return {
    objectID: associacao._id,
    nome: associacao.nome,
    slug: associacao.slug?.current,
    descricao: associacao.descricao,

    // Localização
    cidade: associacao.endereco?.cidade || 'N/A',
    endereco: {
      completo: associacao.endereco?.endereco_completo,
      bairro: associacao.endereco?.bairro,
      cep: associacao.endereco?.cep,
    },

    // Status
    ativa: associacao.ativa !== false,

    // Informações
    especialidades: associacao.especialidades || [],
    numero_artesas: associacao.numero_artesas || 0,
    produtos_count: associacao.produtos_count || 0,

    // Contato
    presidente: associacao.presidente
      ? {
          nome: associacao.presidente.nome,
        }
      : null,

    telefone: associacao.telefone,
    whatsapp: associacao.whatsapp,

    // Imagens
    imagem_principal: associacao.imagens?.[0] || null,

    // Metadados
    created_at: associacao._createdAt,
    updated_at: associacao._updatedAt,

    // Geolocalização
    _geoloc: associacao.endereco?.coordenadas
      ? {
          lat: associacao.endereco.coordenadas.lat,
          lng: associacao.endereco.coordenadas.lng,
        }
      : undefined,
  };
}

// Utilitários auxiliares
function getPriceRange(price: number): string {
  if (price <= 50) return '0-50';
  if (price <= 100) return '51-100';
  if (price <= 200) return '101-200';
  if (price <= 500) return '201-500';
  return '500+';
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}
