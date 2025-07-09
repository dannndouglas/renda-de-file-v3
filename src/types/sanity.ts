export interface SanityImage {
  asset:
    | {
        _ref: string;
        _type: 'reference';
        url?: string;
      }
    | {
        url: string;
      };
  alt?: string;
}

export interface Associacao {
  _id: string;
  nome: string;
  descricao?: string;
  telefone?: string;
  whatsapp?: string;
  endereco?: string;
  sobre?: string;
}

export interface Produto {
  _id: string;
  nome: string;
  slug: {
    current: string;
  };
  descricao: string;
  descricaoDetalhada?: string;
  imagens?: SanityImage[];
  categoria: string;
  disponibilidade: 'disponivel' | 'sob_encomenda';
  preco: number;
  tempoProducao?: string;
  personalizavel?: boolean;
  dimensoes?: string;
  materiais?: string[];
  tecnicas?: string[];
  cuidados?: string;
  historia?: string;
  associacao?: Associacao;
}

export interface Noticia {
  _id: string;
  titulo: string;
  slug: {
    current: string;
  };
  resumo: string;
  imagemCapa?: SanityImage;
  imagemPrincipal?: SanityImage;
  dataPublicacao: string;
  conteudo?: any[];
  autor?: string;
  tags?: string[];
}
