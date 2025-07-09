const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Configurar cliente Sanity
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rsgezubm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'development',
  apiVersion: '2024-01-01',
  token:
    process.env.SANITY_API_TOKEN ||
    'skmeP9sHct8XLOfYyU2J1DgiXOWLQBnllwtUHo7sHBIDrye8YR9pTbDYT2ofIibFDcLfG3lBN3GBiSieDFyUYFWCDZIUCmQGdbdTpfERlTIzRHkXKpfwHCFWKwjka87ooBa0EE25ZOEwFpMkkG5BPEb78Krwav4h4n2KqOkyhTduVao4oO2q',
  useCdn: false,
});

// Carregar dados de exemplo
const sampleData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'sample-data.json'), 'utf8')
);

async function populateSanityData() {
  try {
    console.log('🚀 Iniciando população de dados no Sanity...');

    // 1. Criar configurações gerais
    console.log('📋 Criando configurações gerais...');
    const configDoc = {
      _type: 'configuracoes',
      _id: 'configuracoes',
      ...sampleData.configuracoes,
    };
    await client.createOrReplace(configDoc);
    console.log('✅ Configurações criadas');

    // 2. Criar página inicial
    console.log('🏠 Criando página inicial...');
    const paginaInicialDoc = {
      _type: 'paginaInicial',
      _id: 'paginaInicial',
      ...sampleData.paginaInicial,
    };
    await client.createOrReplace(paginaInicialDoc);
    console.log('✅ Página inicial criada');

    // 3. Criar associações
    console.log('🏢 Criando associações...');
    const associacoesPromises = sampleData.exemplos.associacoes.map(
      async (assoc) => {
        const associacaoDoc = {
          _type: 'associacao',
          _id: `associacao-${assoc.slug}`,
          ...assoc,
          slug: { current: assoc.slug },
          ativo: true,
          _createdAt: new Date().toISOString(),
        };
        return await client.createOrReplace(associacaoDoc);
      }
    );
    await Promise.all(associacoesPromises);
    console.log(
      `✅ ${sampleData.exemplos.associacoes.length} associações criadas`
    );

    // 4. Criar produtos
    console.log('📦 Criando produtos...');
    const produtosPromises = sampleData.exemplos.produtos.map(
      async (produto) => {
        const produtoDoc = {
          _type: 'produto',
          _id: `produto-${produto.slug}`,
          ...produto,
          slug: { current: produto.slug },
          associacao: {
            _type: 'reference',
            _ref: `associacao-${sampleData.exemplos.associacoes[0].slug}`,
          },
          _createdAt: new Date().toISOString(),
        };
        return await client.createOrReplace(produtoDoc);
      }
    );
    await Promise.all(produtosPromises);
    console.log(`✅ ${sampleData.exemplos.produtos.length} produtos criados`);

    // 5. Criar notícias
    console.log('📰 Criando notícias...');
    const noticiasPromises = sampleData.exemplos.noticias.map(
      async (noticia) => {
        const noticiaDoc = {
          _type: 'noticia',
          _id: `noticia-${noticia.slug}`,
          ...noticia,
          slug: { current: noticia.slug },
          dataPublicacao: new Date().toISOString(),
          conteudo: [
            {
              _type: 'block',
              _key: 'block1',
              style: 'normal',
              children: [
                {
                  _type: 'span',
                  _key: 'span1',
                  text: `Conteúdo da notícia: ${noticia.resumo}`,
                  marks: [],
                },
              ],
            },
          ],
          _createdAt: new Date().toISOString(),
        };
        return await client.createOrReplace(noticiaDoc);
      }
    );
    await Promise.all(noticiasPromises);
    console.log(`✅ ${sampleData.exemplos.noticias.length} notícias criadas`);

    console.log('🎉 População de dados concluída com sucesso!');
    console.log(`🔗 Acesse o Sanity Studio em: http://localhost:3334`);
  } catch (error) {
    console.error('❌ Erro ao popular dados:', error);
  }
}

// Executar script
populateSanityData();
