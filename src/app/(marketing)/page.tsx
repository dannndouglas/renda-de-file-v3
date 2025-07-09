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
  description:
    'Conheça a Renda de Filé, patrimônio cultural de mais de 300 anos. Produtos artesanais feitos pelas mãos habilidosas das rendeiras de Jaguaribe, Ceará.',
};

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

async function getHomeData() {
  try {
    const data = await sanityClient.fetch(
      HOME_QUERY,
      {},
      {
        next: { revalidate: 3600 }, // Revalidar a cada hora
      }
    );
    return data;
  } catch (error) {
    console.error('[HOME] Erro ao buscar dados:', error);
    return {
      produtos: [],
      stats: { rendeiras: 0, produtos: 0, anos: 300 },
      noticias: [],
    };
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
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Produtos em Destaque
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Conheça algumas das peças mais especiais criadas pelas nossas
              rendeiras
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {produtos.map((produto: any) => (
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
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Últimas Notícias
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Fique por dentro das novidades do mundo da Renda de Filé
              </p>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {noticias.map((noticia: Noticia) => (
                <article
                  key={noticia._id}
                  className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <Link href={`/noticias/${noticia.slug.current}`}>
                    {noticia.imagemPrincipal?.asset && (
                      <div className="relative aspect-video bg-gray-200">
                        <Image
                          src={noticia.imagemPrincipal.asset.url || ''}
                          alt={noticia.titulo}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <time className="text-sm text-gray-500">
                        {new Date(noticia.dataPublicacao).toLocaleDateString(
                          'pt-BR'
                        )}
                      </time>
                      <h3 className="mb-3 mt-2 text-xl font-semibold text-gray-900">
                        {noticia.titulo}
                      </h3>
                      <p className="line-clamp-3 text-gray-600">
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
      <section className="bg-renda-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Apoie a Tradição
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            Cada peça adquirida ajuda a preservar esta arte centenária e
            sustenta famílias de rendeiras em Jaguaribe
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/associacoes">
              <Button size="lg" variant="outline">
                Conheça as Associações
              </Button>
            </Link>
            <Link href="/historia">
              <Button size="lg">Nossa História</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
