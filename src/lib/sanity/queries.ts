// Queries GROQ para buscar dados do Sanity

export const PRODUTOS_QUERY = `*[_type == "produto"] | order(_createdAt desc) {
  _id,
  nome,
  slug,
  descricao,
  descricaoBreve,
  "imagens": imagens[]{
    _type,
    _key,
    asset->{
      _id,
      _type,
      url,
      metadata
    }
  },
  categoria,
  disponibilidade,
  preco,
  precoPromocional,
  tempoProducao,
  destaque,
  personalizavel,
  tags,
  associacao->{
    _id,
    nome,
    slug,
    whatsapp,
    telefone
  },
  _createdAt
}`;

export const PRODUTOS_DESTAQUE_QUERY = `*[_type == "produto" && destaque == true] | order(_createdAt desc) [0...6] {
  _id,
  nome,
  slug,
  descricao,
  descricaoBreve,
  "imagens": imagens[]{
    _type,
    _key,
    asset->{
      _id,
      _type,
      url,
      metadata
    }
  },
  categoria,
  disponibilidade,
  preco,
  precoPromocional,
  destaque,
  associacao->{
    _id,
    nome,
    slug,
    whatsapp,
    telefone
  }
}`;

export const PRODUTO_BY_SLUG_QUERY = `*[_type == "produto" && slug.current == $slug][0] {
  _id,
  nome,
  slug,
  descricao,
  descricaoBreve,
  "imagens": imagens[]{
    _type,
    _key,
    asset->{
      _id,
      _type,
      url,
      metadata
    }
  },
  categoria,
  disponibilidade,
  preco,
  precoPromocional,
  tempoProducao,
  destaque,
  personalizavel,
  tags,
  metaTitle,
  metaDescription,
  associacao->{
    _id,
    nome,
    slug,
    descricao,
    telefone,
    whatsapp,
    email,
    endereco,
    redesSociais
  },
  _createdAt
}`;

export const ASSOCIACOES_QUERY = `*[_type == "associacao" && ativo == true] | order(nome asc) {
  _id,
  nome,
  slug,
  descricao,
  "logo": logo{
    asset->{
      _id,
      _type,
      url,
      metadata
    },
    alt
  },
  endereco,
  telefone,
  email,
  whatsapp,
  redesSociais,
  numeroMembros,
  especialidades,
  "produtoCount": count(*[_type == "produto" && references(^._id)])
}`;

export const ASSOCIACAO_BY_SLUG_QUERY = `*[_type == "associacao" && slug.current == $slug][0] {
  _id,
  nome,
  slug,
  descricao,
  historia,
  "logo": logo{
    asset->{
      _id,
      _type,
      url,
      metadata
    },
    alt
  },
  "banner": banner{
    asset->{
      _id,
      _type,
      url,
      metadata
    },
    alt
  },
  "galeria": galeria[]{
    asset->{
      _id,
      _type,
      url,
      metadata
    },
    alt
  },
  endereco,
  telefone,
  email,
  whatsapp,
  redesSociais,
  numeroMembros,
  especialidades,
  ativo,
  "produtos": *[_type == "produto" && references(^._id)] | order(_createdAt desc) {
    _id,
    nome,
    slug,
    "imagens": imagens[]{
      _type,
      _key,
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    categoria,
    disponibilidade,
    preco,
    precoPromocional,
    destaque
  }
}`;

export const NOTICIAS_QUERY = `*[_type == "noticia"] | order(dataPublicacao desc) {
  _id,
  titulo,
  slug,
  resumo,
  imagemPrincipal,
  categoria,
  tags,
  autor,
  dataPublicacao,
  destaque,
  tempoLeitura
}`;

export const NOTICIAS_DESTAQUE_QUERY = `*[_type == "noticia" && destaque == true] | order(dataPublicacao desc) [0...3] {
  _id,
  titulo,
  slug,
  resumo,
  imagemDestaque,
  categoria,
  autor,
  dataPublicacao
}`;

export const NOTICIA_BY_SLUG_QUERY = `*[_type == "noticia" && slug.current == $slug][0] {
  _id,
  titulo,
  slug,
  resumo,
  imagemPrincipal,
  conteudo,
  categoria,
  tags,
  autor,
  dataPublicacao,
  tempoLeitura,
  galeria,
  metaTitle,
  metaDescription
}`;

export const NOTICIAS_RELACIONADAS_QUERY = `*[_type == "noticia" && categoria == $categoria && _id != $atualId] | order(dataPublicacao desc) [0...3] {
  _id,
  titulo,
  slug,
  resumo,
  imagemPrincipal,
  categoria,
  autor,
  dataPublicacao,
  tempoLeitura
}`;

export const EVENTOS_QUERY = `*[_type == "evento"] | order(dataInicio desc) {
  _id,
  titulo,
  slug,
  descricao,
  imagemDestaque,
  dataInicio,
  dataFim,
  horario,
  local,
  endereco,
  tipo,
  preco,
  gratuito,
  linkInscricao,
  telefoneContato,
  whatsappContato,
  emailContato,
  organizador,
  capacidade,
  destaque,
  status
}`;

export const EVENTOS_PROXIMOS_QUERY = `*[_type == "evento" && dataInicio > now() && status in ["programado", "inscricoes-abertas"]] | order(dataInicio asc) [0...6] {
  _id,
  titulo,
  slug,
  descricao,
  imagemDestaque,
  dataInicio,
  dataFim,
  horario,
  local,
  tipo,
  preco,
  gratuito,
  linkInscricao,
  destaque,
  status
}`;

export const EVENTO_BY_SLUG_QUERY = `*[_type == "evento" && slug.current == $slug][0] {
  _id,
  titulo,
  slug,
  descricao,
  imagemDestaque,
  dataInicio,
  dataFim,
  horario,
  local,
  endereco,
  tipo,
  preco,
  gratuito,
  linkInscricao,
  telefoneContato,
  whatsappContato,
  emailContato,
  organizador,
  capacidade,
  destaque,
  status
}`;

export const CONFIGURACOES_QUERY = `*[_type == "configuracoes"][0] {
  _id,
  titulo,
  descricao,
  logo,
  favicon,
  ogImage,
  heroSection,
  estatisticas,
  contato,
  redesSociais,
  seo
}`;

export const PAGINA_HISTORIA_QUERY = `*[_type == "paginaHistoria"][0] {
  _id,
  titulo,
  introducao,
  imagemPrincipal {
    asset->{
      _id,
      _type,
      url,
      metadata
    },
    alt
  },
  timeline[]{
    ano,
    titulo,
    descricao,
    icone,
    imagem {
      asset->{
        _id,
        _type,
        url,
        metadata
      },
      alt
    }
  },
  tecnicas[]{
    nome,
    descricao,
    dificuldade,
    imagem {
      asset->{
        _id,
        _type,
        url,
        metadata
      },
      alt
    }
  },
  impacto {
    texto,
    estatisticas[]{
      numero,
      label,
      icone
    }
  },
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
}`;

export const SEARCH_QUERY = `*[_type in ["produto", "associacao", "noticia"] && (
  nome match $searchTerm + "*" ||
  titulo match $searchTerm + "*" ||
  descricao match $searchTerm + "*"
)] | order(_score desc) [0...20] {
  _type,
  _id,
  "title": coalesce(nome, titulo),
  "subtitle": coalesce(descricaoBreve, resumo, descricao),
  slug,
  "image": coalesce(imagens[0], imagemDestaque),
  _score
}`;
