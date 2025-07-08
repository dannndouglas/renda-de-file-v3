import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Início',
  description:
    'Descubra a tradição da Renda de Filé de Jaguaribe, artesanato único com mais de 300 anos de história.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding relative bg-gradient-to-br from-renda-50 via-areia-50 to-renda-100">
        <div className="container">
          <div className="text-center">
            <h1 className="heading-1 mb-6 text-balance">
              Renda de Filé de Jaguaribe
            </h1>
            <p className="body-large mx-auto mb-8 max-w-3xl text-balance">
              Tradição que atravessa gerações. Descubra a arte milenar da Renda
              de Filé, patrimônio cultural imaterial de Jaguaribe, Ceará.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-renda-600 px-8 hover:bg-renda-700"
              >
                Conheça Nossa História
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-renda-600 px-8 text-renda-600 hover:bg-renda-50"
              >
                Veja o Catálogo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introdução */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="heading-2 mb-6">A Arte Que Define Jaguaribe</h2>
              <p className="body-normal mb-6">
                A Renda de Filé é mais que um artesanato - é a alma de nossa
                cidade. Cada peça carrega consigo séculos de tradição, passada
                de mãe para filha, preservando a herança cultural de nosso povo.
              </p>
              <p className="body-normal mb-8">
                Feita à mão com amor e dedicação, nossa renda representa a
                resistência cultural e a arte genuína do Nordeste brasileiro.
              </p>
              <button className="btn-primary">Saiba Mais</button>
            </div>
            <div className="relative h-96 rounded-xl bg-gradient-to-br from-renda-200 to-areia-200">
              {/* Placeholder para imagem */}
              <div className="absolute inset-0 flex items-center justify-center text-renda-600">
                <span className="text-lg font-medium">
                  Imagem da Renda de Filé
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4">Peças em Destaque</h2>
            <p className="body-large mx-auto max-w-2xl text-balance">
              Conheça algumas de nossas criações mais especiais, feitas com
              técnicas tradicionais pelas artesãs de Jaguaribe.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card Placeholder 1 */}
            <div className="product-card">
              <div className="relative aspect-square bg-gradient-to-br from-renda-100 to-areia-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-medium text-renda-600">Produto 1</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-4 mb-2">Toalha de Mesa</h3>
                <p className="body-small mb-3">Associação das Rendeiras</p>
                <div className="mb-4 flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Disponível
                  </Badge>
                  <span className="font-semibold text-renda-600">
                    A partir de R$ 250,00
                  </span>
                </div>
                <Button className="btn-whatsapp w-full">
                  💬 Conversar no WhatsApp
                </Button>
              </div>
            </div>

            {/* Card Placeholder 2 */}
            <div className="product-card">
              <div className="relative aspect-square bg-gradient-to-br from-renda-100 to-areia-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-medium text-renda-600">Produto 2</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-4 mb-2">Cortina Decorativa</h3>
                <p className="body-small mb-3">Associação Mãos de Ouro</p>
                <div className="mb-4 flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800"
                  >
                    Sob Encomenda
                  </Badge>
                  <span className="font-semibold text-renda-600">
                    A partir de R$ 180,00
                  </span>
                </div>
                <Button className="btn-whatsapp w-full">
                  💬 Encomendar via WhatsApp
                </Button>
              </div>
            </div>

            {/* Card Placeholder 3 */}
            <div className="product-card">
              <div className="relative aspect-square bg-gradient-to-br from-renda-100 to-areia-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-medium text-renda-600">Produto 3</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="heading-4 mb-2">Conjunto de Bebê</h3>
                <p className="body-small mb-3">Associação Arte e Tradição</p>
                <div className="mb-4 flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Disponível
                  </Badge>
                  <span className="font-semibold text-renda-600">
                    A partir de R$ 120,00
                  </span>
                </div>
                <Button className="btn-whatsapp w-full">
                  💬 Conversar no WhatsApp
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-renda-600 px-8 hover:bg-renda-700">
              Ver Catálogo Completo
            </Button>
          </div>
        </div>
      </section>

      {/* Impacto Cultural */}
      <section className="section-padding bg-renda-600 text-white">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="heading-2 mb-4 text-white">
              Nosso Impacto Cultural
            </h2>
            <p className="body-large mx-auto max-w-2xl text-renda-100">
              Números que representam nossa dedicação à preservação cultural e
              ao apoio às artesãs locais.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">300+</div>
              <div className="text-renda-100">Anos de Tradição</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">500+</div>
              <div className="text-renda-100">Artesãs Ativas</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">1</div>
              <div className="text-renda-100">
                Patrimônio Cultural Imaterial
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">5</div>
              <div className="text-renda-100">Continentes de Exportação</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
