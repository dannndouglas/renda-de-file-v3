import { sanityClient } from './client';
import { CONFIGURACOES_QUERY } from './queries';

export interface ConfiguracoesGlobais {
  titulo?: string;
  descricao?: string;
  logo?: {
    asset?: {
      _id: string;
      _type: string;
      url: string;
      metadata?: any;
    };
  };
  favicon?: {
    asset?: {
      _id: string;
      _type: string;
      url: string;
      metadata?: any;
    };
  };
  contato?: {
    email?: string;
    telefone?: string;
    whatsapp?: string;
    endereco?: {
      rua?: string;
      numero?: string;
      bairro?: string;
      cidade?: string;
      estado?: string;
      cep?: string;
    };
  };
  redesSociais?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: {
      asset?: {
        url: string;
      };
    };
  };
}

let cachedConfig: ConfiguracoesGlobais | null = null;

export async function getConfiguracoesGlobais(): Promise<ConfiguracoesGlobais | null> {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const config = await sanityClient.fetch<ConfiguracoesGlobais>(
      CONFIGURACOES_QUERY,
      {},
      {
        next: { revalidate: 3600 }, // Revalidar a cada hora
      }
    );

    cachedConfig = config;
    return config;
  } catch (error) {
    console.error('[CONFIG] Erro ao buscar configurações:', error);
    return null;
  }
}

// Limpar cache quando necessário
export function clearConfigCache() {
  cachedConfig = null;
}
