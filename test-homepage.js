const { createClient } = require('@sanity/client');

// Simular o que acontece na página inicial
const client = createClient({
  projectId: 'rsgezubm',
  dataset: 'development',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const HOME_QUERY = `{
  "produtos": *[_type == "produto"] | order(_createdAt desc) [0...8] {
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
  },
  "stats": {
    "rendeiras": count(*[_type == "associacao"]),
    "produtos": count(*[_type == "produto"]),
    "anos": 300
  },
  "noticias": *[_type == "noticia"] | order(dataPublicacao desc) [0...3] {
    _id,
    titulo,
    slug,
    resumo,
    imagemPrincipal,
    categoria,
    dataPublicacao
  }
}`;

async function testHomepage() {
  try {
    console.log('🏠 Testando dados da página inicial...');

    const data = await client.fetch(HOME_QUERY);

    console.log('📊 Estatísticas:');
    console.log(`  - Rendeiras: ${data.stats.rendeiras}`);
    console.log(`  - Produtos: ${data.stats.produtos}`);
    console.log(`  - Anos: ${data.stats.anos}`);

    console.log('\n📦 Produtos:');
    data.produtos.forEach((produto, index) => {
      console.log(`  ${index + 1}. ${produto.nome} (${produto.categoria})`);
    });

    console.log('\n📰 Notícias:');
    data.noticias.forEach((noticia, index) => {
      console.log(`  ${index + 1}. ${noticia.titulo}`);
    });

    console.log('\n✅ Dados carregados com sucesso!');
    console.log('🎉 Os produtos devem aparecer na página inicial.');
  } catch (error) {
    console.error('❌ Erro ao buscar dados:', error);
  }
}

testHomepage();
