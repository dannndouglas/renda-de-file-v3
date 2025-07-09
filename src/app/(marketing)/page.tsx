import { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Produto, Noticia } from '@/types/sanity';

export const metadata: Metadata = {
  title: 'Renda de Filé - Artesanato Tradicional de Jaguaribe',
  description: 'Conheça a Renda de Filé, patrimônio cultural de mais de 300 anos. Produtos artesanais feitos pelas mãos habilidosas das rendeiras de Jaguaribe, Ceará.',
};

const HOME_QUERY = `{
  "produtos": *[_type == "produto" && disponibilidade == "disponivel"] | order(createdAt desc) [0...8] {
    _id,
    nome,
    slug,
    descricao,
    imagens,
    categoria,
    disponibilidade,
    preco,
    associacao->{
      _id,
      nome,
      whatsapp
    }
  },
  "stats": {
    "rendeiras": count(*[_type == "associacao"]),
    "produtos": count(*[_type == "produto"]),
    "anos": 300
  },
  "noticias": *[_type == "noticia" && publicado == true] | order(dataPublicacao desc) [0...3] {
    _id,
    titulo,
    slug,
    resumo,
    imagemCapa,
    dataPublicacao
  }
}`;

async function getHomeData() {
  try {
    const data = await sanityClient.fetch(HOME_QUERY, {}, {
      next: { revalidate: 3600 } // Revalidar a cada hora
    });
    return data;
  } catch (error) {
    console.error('[HOME] Erro ao buscar dados:', error);
    return { produtos: [], stats: { rendeiras: 0, produtos: 0, anos: 300 }, noticias: [] };
  }
}

export default async function HomePage() {
  const { produtos, stats, noticias } = await getHomeData();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Estatísticas */}
      <StatsSection 
        rendeiras={stats.rendeiras}
        produtos={stats.produtos}
        anosTradicao={stats.anos}
      />

      {/* Produtos em Destaque */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Conheça algumas das peças mais especiais criadas pelas nossas rendeiras
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {produtos.map((produto: Produto) => (
              <ProductCard key={produto._id} produto={produto} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/catalogo">
              <Button size="lg" className="gap-2">
                Ver Catálogo Completo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Notícias Recentes */}
      {noticias.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Últimas Notícias
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fique por dentro das novidades do mundo da Renda de Filé
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {noticias.map((noticia: Noticia) => (
                <article key={noticia._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/noticias/${noticia.slug.current}`}>
                    {noticia.imagemCapa && (
                      <div className="aspect-video bg-gray-200 relative">
                        <Image 
                          src={noticia.imagemCapa.asset.url} 
                          alt={noticia.titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <time className="text-sm text-gray-500">
                        {new Date(noticia.dataPublicacao).toLocaleDateString('pt-BR')}
                      </time>
                      <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                        {noticia.titulo}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {noticia.resumo}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <div className="text-center">
              <Link href="/noticias">
                <Button variant="outline" size="lg" className="gap-2">
                  Ver Todas as Notícias
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-renda-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Apoie a Tradição
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Cada peça adquirida ajuda a preservar esta arte centenária e sustenta 
            famílias de rendeiras em Jaguaribe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/associacoes">
              <Button size="lg" variant="outline">
                Conheça as Associações
              </Button>
            </Link>
            <Link href="/historia">
              <Button size="lg">
                Nossa História
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}