const { createClient } = require('@sanity/client');

// Configurar cliente Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rsgezubm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'development',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function testSanityConnection() {
  try {
    console.log('🔍 Testando conexão com Sanity...');

    // Buscar produtos
    const produtos = await client.fetch('*[_type == "produto"]');
    console.log(`✅ Produtos encontrados: ${produtos.length}`);

    if (produtos.length > 0) {
      console.log('📦 Primeiro produto:', produtos[0].nome);
    }

    // Buscar associações
    const associacoes = await client.fetch('*[_type == "associacao"]');
    console.log(`✅ Associações encontradas: ${associacoes.length}`);

    if (associacoes.length > 0) {
      console.log('🏢 Primeira associação:', associacoes[0].nome);
    }

    // Buscar notícias
    const noticias = await client.fetch('*[_type == "noticia"]');
    console.log(`✅ Notícias encontradas: ${noticias.length}`);

    if (noticias.length > 0) {
      console.log('📰 Primeira notícia:', noticias[0].titulo);
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com Sanity:', error);
  }
}

testSanityConnection();
