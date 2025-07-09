const { createClient } = require('@sanity/client');

// Simular o que acontece no catálogo
const client = createClient({
  projectId: 'rsgezubm',
  dataset: 'development',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const PRODUTOS_QUERY = `*[_type == "produto"] | order(_createdAt desc) {
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

const ASSOCIACOES_QUERY = `*[_type == "associacao"] | order(nome asc) {
  _id,
  nome,
  descricao,
  imagem,
  telefone,
  whatsapp,
  endereco,
  numeroRendeiras,
  dataFundacao,
  presidente,
  sobre,
  "produtosCount": count(*[_type == "produto" && references(^._id)])
}`;

async function testCatalogAndAssociations() {
  try {
    console.log('🛍️ Testando catálogo de produtos...');

    const produtos = await client.fetch(PRODUTOS_QUERY);

    console.log(`📦 ${produtos.length} produtos encontrados:`);
    produtos.forEach((produto, index) => {
      console.log(`  ${index + 1}. ${produto.nome}`);
      console.log(`     Categoria: ${produto.categoria}`);
      console.log(`     Disponibilidade: ${produto.disponibilidade}`);
      console.log(`     Preço: R$ ${produto.preco}`);
      console.log(`     Associação: ${produto.associacao?.nome || 'N/A'}`);
      console.log('');
    });

    console.log('\n🏢 Testando associações...');

    const associacoes = await client.fetch(ASSOCIACOES_QUERY);

    console.log(`🏛️ ${associacoes.length} associações encontradas:`);
    associacoes.forEach((assoc, index) => {
      console.log(`  ${index + 1}. ${assoc.nome}`);
      console.log(`     Produtos: ${assoc.produtosCount}`);
      console.log(`     WhatsApp: ${assoc.whatsapp || 'N/A'}`);
      console.log('');
    });

    console.log('✅ Catálogo e associações testados com sucesso!');
    console.log('🎉 Os dados devem aparecer em todas as páginas.');
  } catch (error) {
    console.error('❌ Erro ao buscar dados:', error);
  }
}

testCatalogAndAssociations();
