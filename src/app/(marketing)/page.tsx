import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Início',
  description: 'Descubra a tradição da Renda de Filé de Jaguaribe, artesanato único com mais de 300 anos de história.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-renda-50 via-areia-50 to-renda-100 section-padding">
        <div className="container">
          <div className="text-center">
            <h1 className="heading-1 mb-6 text-balance">
              Renda de Filé de Jaguaribe
            </h1>
            <p className="body-large mx-auto max-w-3xl mb-8 text-balance">
              Tradição que atravessa gerações. Descubra a arte milenar da Renda de Filé, 
              patrimônio cultural imaterial de Jaguaribe, Ceará.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Conheça Nossa História
              </button>
              <button className="btn-secondary">
                Veja o Catálogo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Introdução */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">
                A Arte Que Define Jaguaribe
              </h2>
              <p className="body-normal mb-6">
                A Renda de Filé é mais que um artesanato - é a alma de nossa cidade. 
                Cada peça carrega consigo séculos de tradição, passada de mãe para filha, 
                preservando a herança cultural de nosso povo.
              </p>
              <p className="body-normal mb-8">
                Feita à mão com amor e dedicação, nossa renda representa a resistência 
                cultural e a arte genuína do Nordeste brasileiro.
              </p>
              <button className="btn-primary">
                Saiba Mais
              </button>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-renda-200 to-areia-200 rounded-xl">
              {/* Placeholder para imagem */}
              <div className="absolute inset-0 flex items-center justify-center text-renda-600">
                <span className="text-lg font-medium">Imagem da Renda de Filé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">
              Peças em Destaque
            </h2>
            <p className="body-large max-w-2xl mx-auto text-balance">
              Conheça algumas de nossas criações mais especiais, 
              feitas com técnicas tradicionais pelas artesãs de Jaguaribe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card Placeholder 1 */}
            <div className="product-card">
              <div className="aspect-square bg-gradient-to-br from-renda-100 to-areia-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-renda-600 font-medium">Produto 1</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-4 mb-2">Toalha de Mesa</h3>
                <p className="body-small mb-3">Associação das Rendeiras</p>
                <div className="flex items-center justify-between">
                  <span className="badge-disponivel">Disponível</span>
                  <span className="font-semibold text-renda-600">A partir de R$ 250,00</span>
                </div>
                <button className="btn-whatsapp w-full mt-4">
                  💬 Conversar no WhatsApp
                </button>
              </div>
            </div>

            {/* Card Placeholder 2 */}
            <div className="product-card">
              <div className="aspect-square bg-gradient-to-br from-renda-100 to-areia-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-renda-600 font-medium">Produto 2</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-4 mb-2">Cortina Decorativa</h3>
                <p className="body-small mb-3">Associação Mãos de Ouro</p>
                <div className="flex items-center justify-between">
                  <span className="badge-encomenda">Sob Encomenda</span>
                  <span className="font-semibold text-renda-600">A partir de R$ 180,00</span>
                </div>
                <button className="btn-whatsapp w-full mt-4">
                  💬 Encomendar via WhatsApp
                </button>
              </div>
            </div>

            {/* Card Placeholder 3 */}
            <div className="product-card">
              <div className="aspect-square bg-gradient-to-br from-renda-100 to-areia-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-renda-600 font-medium">Produto 3</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-4 mb-2">Conjunto de Bebe</h3>
                <p className="body-small mb-3">Associação Arte e Tradição</p>
                <div className="flex items-center justify-between">
                  <span className="badge-disponivel">Disponível</span>
                  <span className="font-semibold text-renda-600">A partir de R$ 120,00</span>
                </div>
                <button className="btn-whatsapp w-full mt-4">
                  💬 Conversar no WhatsApp
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="btn-primary">
              Ver Catálogo Completo
            </button>
          </div>
        </div>
      </section>

      {/* Impacto Cultural */}
      <section className="section-padding bg-renda-600 text-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4 text-white">
              Nosso Impacto Cultural
            </h2>
            <p className="body-large max-w-2xl mx-auto text-renda-100">
              Números que representam nossa dedicação à preservação cultural 
              e ao apoio às artesãs locais.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">300+</div>
              <div className="text-renda-100">Anos de Tradição</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-renda-100">Artesãs Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1</div>
              <div className="text-renda-100">Patrimônio Cultural Imaterial</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">5</div>
              <div className="text-renda-100">Continentes de Exportação</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}