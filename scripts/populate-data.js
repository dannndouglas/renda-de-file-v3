const { sanityClient } = require('../src/lib/sanity/client');

// Dados de exemplo para popular o site
const dadosExemplo = {
  associacoes: [
    {
      _type: 'associacao',
      nome: 'Associação das Rendeiras de Jaguaribe',
      slug: { current: 'rendeiras-jaguaribe' },
      descricao:
        'Principal associação de artesãs da região de Jaguaribe, preservando a tradição da renda de filé há mais de 50 anos.',
      endereco: {
        rua: 'Rua das Flores',
        numero: '123',
        bairro: 'Centro',
        cidade: 'Jaguaribe',
        estado: 'CE',
        cep: '63475-000',
      },
      telefone: '(88) 3555-1234',
      whatsapp: '5588999887766',
      numeroMembros: 45,
      especialidades: ['Renda de Filé', 'Labirinto', 'Bordado'],
      ativo: true,
    },
    {
      _type: 'associacao',
      nome: 'Grupo Esperança',
      slug: { current: 'grupo-esperanca' },
      descricao:
        'Jovem grupo focado em inovação e designs modernos, mantendo a tradição ancestral.',
      endereco: {
        rua: 'Rua da Esperança',
        numero: '456',
        bairro: 'São José',
        cidade: 'Jaguaribe',
        estado: 'CE',
        cep: '63475-000',
      },
      telefone: '(88) 3555-5678',
      whatsapp: '5588988776655',
      numeroMembros: 28,
      especialidades: ['Renda Filé Moderna', 'Design Contemporâneo'],
      ativo: true,
    },
  ],

  produtos: [
    {
      _type: 'produto',
      nome: 'Toalha de Mesa Flores do Cerrado',
      slug: { current: 'toalha-flores-cerrado' },
      descricao:
        'Linda toalha de mesa em renda de filé com motivos florais típicos do cerrado cearense.',
      descricaoBreve: 'Toalha de mesa em renda de filé com motivos florais',
      categoria: 'decoracao',
      preco: 185.0,
      disponibilidade: 'disponivel',
      tempoProducao: 15,
      destaque: true,
      personalizavel: true,
      tags: ['toalha', 'mesa', 'flores', 'decoracao'],
      especificacoes: {
        materiais: ['Linha de algodão', 'Linha mercerizada'],
        tecnica: 'file',
        dimensoes: {
          altura: 150,
          largura: 220,
          peso: 400,
        },
        cuidados: 'Lavar à mão com sabão neutro. Secar à sombra.',
      },
    },
    {
      _type: 'produto',
      nome: 'Caminho de Mesa Tradicional',
      slug: { current: 'caminho-mesa-tradicional' },
      descricao:
        'Elegante caminho de mesa feito em técnica tradicional de renda de filé.',
      descricaoBreve: 'Caminho de mesa em renda de filé tradicional',
      categoria: 'decoracao',
      preco: 95.0,
      disponibilidade: 'disponivel',
      tempoProducao: 8,
      destaque: false,
      personalizavel: false,
      tags: ['caminho', 'mesa', 'tradicional'],
      especificacoes: {
        materiais: ['Linha de algodão'],
        tecnica: 'file',
        dimensoes: {
          altura: 40,
          largura: 150,
          peso: 180,
        },
      },
    },
    {
      _type: 'produto',
      nome: 'Blusa Feminina Renda',
      slug: { current: 'blusa-feminina-renda' },
      descricao:
        'Blusa feminina delicada com detalhes em renda de filé no decote e mangas.',
      descricaoBreve: 'Blusa feminina com detalhes em renda de filé',
      categoria: 'vestuario',
      preco: 120.0,
      disponibilidade: 'sob-encomenda',
      tempoProducao: 20,
      destaque: true,
      personalizavel: true,
      tags: ['blusa', 'feminina', 'vestuario', 'renda'],
    },
  ],

  noticias: [
    {
      _type: 'noticia',
      titulo: 'Feira de Artesanato Movimenta Economia Local',
      slug: { current: 'feira-artesanato-economia-local' },
      resumo:
        'A tradicional feira de artesanato de Jaguaribe registrou recorde de vendas este mês, aquecendo a economia local.',
      categoria: 'novidades',
      dataPublicacao: new Date().toISOString(),
      autor: { nome: 'Equipe Renda de Filé' },
      destaque: true,
      tags: ['feira', 'economia', 'vendas'],
      conteudo: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'A feira de artesanato de Jaguaribe bateu recordes de vendas neste mês, demonstrando o crescimento da valorização do artesanato tradicional cearense.',
            },
          ],
        },
      ],
    },
    {
      _type: 'noticia',
      titulo: 'Nova Geração de Artesãs Preserva Tradição',
      slug: { current: 'nova-geracao-artesas-tradicao' },
      resumo:
        'Jovens artesãs de Jaguaribe se dedicam a aprender e inovar a técnica da renda de filé.',
      categoria: 'cultura',
      dataPublicacao: new Date().toISOString(),
      autor: { nome: 'Maria Silva' },
      destaque: false,
      tags: ['jovens', 'tradicao', 'inovacao'],
      conteudo: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Uma nova geração de artesãs tem se dedicado a preservar e inovar a tradicional técnica da renda de filé em Jaguaribe.',
            },
          ],
        },
      ],
    },
  ],
};

async function popularDados() {
  try {
    console.log('🚀 Iniciando população de dados...');

    // Primeiro, criar associações
    console.log('📍 Criando associações...');
    const associacoesCriadas = [];
    for (const associacao of dadosExemplo.associacoes) {
      const result = await sanityClient.create(associacao);
      associacoesCriadas.push(result);
      console.log(`✅ Associação criada: ${result.nome}`);
    }

    // Depois, criar produtos vinculados às associações
    console.log('🛍️ Criando produtos...');
    for (let i = 0; i < dadosExemplo.produtos.length; i++) {
      const produto = {
        ...dadosExemplo.produtos[i],
        associacao: {
          _type: 'reference',
          _ref: associacoesCriadas[i % associacoesCriadas.length]._id,
        },
      };
      const result = await sanityClient.create(produto);
      console.log(`✅ Produto criado: ${result.nome}`);
    }

    // Por último, criar notícias
    console.log('📰 Criando notícias...');
    for (const noticia of dadosExemplo.noticias) {
      const result = await sanityClient.create(noticia);
      console.log(`✅ Notícia criada: ${result.titulo}`);
    }

    console.log('🎉 Dados populados com sucesso!');
    console.log(
      '📝 Acesse o Sanity Studio para visualizar: http://localhost:3334'
    );
  } catch (error) {
    console.error('❌ Erro ao popular dados:', error);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  popularDados();
}

module.exports = { popularDados, dadosExemplo };
