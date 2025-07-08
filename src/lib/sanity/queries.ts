// Queries GROQ para buscar dados do Sanity

export const PRODUTOS_QUERY = `*[_type == "produto"] | order(_createdAt desc) {
  _id,
  nome,
  slug,
  descricao,
  descricaoBreve,
  imagens,
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
  imagens,
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
  imagens,
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
    cidade,
    estado,
    instagram,
    facebook,
    website
  },
  _createdAt
}`;

export const ASSOCIACOES_QUERY = `*[_type == "associacao" && ativo == true] | order(nome asc) {
  _id,
  nome,
  slug,
  descricao,
  logo,
  endereco,
  cidade,
  estado,
  telefone,
  whatsapp,
  email,
  instagram,
  facebook,
  website,
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
  logo,
  banner,
  endereco,
  cidade,
  estado,
  cep,
  telefone,
  whatsapp,
  email,
  instagram,
  facebook,
  website,
  numeroMembros,
  especialidades,
  "produtos": *[_type == "produto" && references(^._id)] | order(_createdAt desc) {
    _id,
    nome,
    slug,
    imagens,
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
  imagemDestaque,
  categoria,
  tags,
  autor,
  dataPublicacao,
  destaque
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
  imagemDestaque,
  conteudo,
  categoria,
  tags,
  autor,
  dataPublicacao,
  metaTitle,
  metaDescription
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
