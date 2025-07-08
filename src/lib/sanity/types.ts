// Tipos TypeScript para o Sanity

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityReference {
  _type: 'reference';
  _ref: string;
}

export interface SanityBlock {
  _type: 'block';
  _key: string;
  style: string;
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
}

export interface Produto {
  _id: string;
  _type: 'produto';
  nome: string;
  slug: SanitySlug;
  descricao: string;
  descricaoBreve: string;
  imagens: SanityImage[];
  categoria: 'decoracao' | 'vestuario' | 'religioso' | 'bebe' | 'acessorios' | 'personalizado';
  disponibilidade: 'disponivel' | 'sob-encomenda';
  preco?: number;
  precoPromocional?: number;
  tempoProducao?: number;
  destaque: boolean;
  personalizavel: boolean;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  associacao: Associacao;
  _createdAt: string;
}

export interface Associacao {
  _id: string;
  _type: 'associacao';
  nome: string;
  slug: SanitySlug;
  descricao: string;
  historia?: SanityBlock[];
  logo?: SanityImage;
  banner?: SanityImage;
  endereco: string;
  cidade: string;
  estado: string;
  cep?: string;
  telefone: string;
  whatsapp: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  numeroMembros?: number;
  especialidades?: string[];
  ativo: boolean;
  produtos?: Produto[];
  produtoCount?: number;
}

export interface Noticia {
  _id: string;
  _type: 'noticia';
  titulo: string;
  slug: SanitySlug;
  resumo: string;
  imagemDestaque: SanityImage;
  conteudo: (SanityBlock | SanityImage)[];
  categoria: 'noticia' | 'evento' | 'festival' | 'workshop' | 'exposicao';
  tags?: string[];
  autor?: string;
  dataPublicacao: string;
  destaque: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Evento {
  _id: string;
  _type: 'evento';
  titulo: string;
  slug: SanitySlug;
  descricao: string;
  imagemDestaque?: SanityImage;
  dataInicio: string;
  dataFim?: string;
  horario?: string;
  local: string;
  endereco?: string;
  tipo: 'festival' | 'workshop' | 'exposicao' | 'feira' | 'curso' | 'encontro';
  preco?: number;
  gratuito: boolean;
  linkInscricao?: string;
  telefoneContato?: string;
  whatsappContato?: string;
  emailContato?: string;
  organizador?: string;
  capacidade?: number;
  destaque: boolean;
  status: 'programado' | 'inscricoes-abertas' | 'lotado' | 'em-andamento' | 'finalizado' | 'cancelado';
}

export interface HeroSection {
  titulo: string;
  subtitulo: string;
  botaoPrimario: string;
  botaoSecundario: string;
  imagemFundo?: SanityImage;
}

export interface Estatistica {
  valor: string;
  label: string;
}

export interface Configuracoes {
  _id: string;
  _type: 'configuracoes';
  titulo: string;
  descricao: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  ogImage?: SanityImage;
  heroSection: HeroSection;
  estatisticas: {
    titulo: string;
    subtitulo: string;
    itens: Estatistica[];
  };
  contato: {
    telefone?: string;
    whatsapp?: string;
    email?: string;
    endereco?: string;
    horarioFuncionamento?: string;
  };
  redesSociais: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface SearchResult {
  _type: 'produto' | 'associacao' | 'noticia';
  _id: string;
  title: string;
  subtitle: string;
  slug: SanitySlug;
  image?: SanityImage;
  _score: number;
}