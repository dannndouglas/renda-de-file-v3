import { Metadata } from 'next';
import { sanityClient } from '@/lib/sanity/client';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ProductCard } from '@/components/catalog/ProductCard';
import { CallToActionSection } from '@/components/sections/call-to-action-section';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/lib/images/sanity';
import type { Produto, Noticia } from '@/types/sanity';

export const metadata: Metadata = {
  title: 'Renda de Filé - Artesanato Tradicional de Jaguaribe',
  description:
    'Conheça a Renda de Filé, patrimônio cultural de mais de 300 anos. Produtos artesanais feitos pelas mãos habilidosas das rendeiras de Jaguaribe, Ceará.',
};

const HOME_QUERY = `{
  "paginaInicial": *[_type == "paginaInicial"][0] {
    hero {
      titulo,
      subtitulo,
      imagem {
        asset->{
          _id,
          _type,
          url,
          metadata
        }
      },
      cta {
        texto,
        link
      }
    },
    sobre {
      titulo,
      texto,
      imagem {
        asset->{
          _id,
          _type,
          url,
          metadata
        }
      }
    },
    estatisticas[]{
      numero,
      label,
      icone
    }
  },
  "produtos": *[_type == "produto" && destaque == true] | order(_createdAt desc) [0...4] {
    _id,
    nome,
    slug,
    descricao,
    descricaoBreve,
    "imagens": imagens[]{
      _type,
      _key,
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
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
    "imagemPrincipal": imagemPrincipal{
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    categoria,
    dataPublicacao
  },
  "configuracoes": *[_type == "configuracoes"][0] {
    titulo,
    descricao,
    logo {
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    favicon {
      asset->{
        _id,
        _type,
        url,
        metadata
      }
    },
    contato {
      email,
      telefone,
      whatsapp,
      endereco {
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep
      }
    },
    redesSociais {
      facebook,
      instagram,
      twitter,
      youtube
    }
  }
}`;

async function getHomeData() {
  try {
    const data = await sanityClient.fetch(
      HOME_QUERY,
      {},
      {
        next: { revalidate: 300 }, // Cache por 5 minutos
      }
    );
    return data;
  } catch (error) {
    console.error('[HOME] Erro ao buscar dados:', error);
    return {
      produtos: [],
      stats: { rendeiras: 0, produtos: 0, anos: 300 },
      noticias: [],
      paginaInicial: null,
      configuracoes: null,
    };
  }
}

export default async function HomePage() {
  const { produtos, stats, noticias, paginaInicial, configuracoes } =
    await getHomeData();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hero={paginaInicial?.hero} />

      {/* Estatísticas */}
      <StatsSection
        rendeiras={stats.rendeiras}
        produtos={stats.produtos}
        anosTradicao={stats.anos}
        estatisticasCustomizadas={paginaInicial?.estatisticas}
      />

      {/* Produtos em Destaque */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="animate-fade-up mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Produtos em Destaque
            </h2>
            <p className="animation-delay-200 mx-auto max-w-2xl text-lg text-gray-600">
              Conheça algumas das peças mais especiais criadas pelas nossas
              rendeiras
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {produtos.map((produto: any, index: number) => (
              <div
                key={produto._id}
                className="animate-scale-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard produto={produto} />
              </div>
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
              {noticias.map((noticia: Noticia, index: number) => (
                <article
                  key={noticia._id}
                  className="hover-lift animate-fade-up overflow-hidden rounded-lg bg-white shadow-md"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Link href={`/noticias/${noticia.slug.current}`}>
                    {noticia.imagemPrincipal && (
                      <div className="relative aspect-video bg-gray-200">
                        <Image
                          src={
                            urlForImage(noticia.imagemPrincipal, {
                              width: 640,
                              height: 360,
                              quality: 85,
                            }) || ''
                          }
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
      <div className="container mx-auto px-4 py-16">
        <CallToActionSection
          subtitle="Apoie a Tradição"
          title="Preserve uma Arte Centenária"
          description="Cada peça adquirida ajuda a preservar esta arte centenária e sustenta famílias de rendeiras em Jaguaribe. Sua contribuição fortalece a economia local e mantém viva uma tradição de mais de 300 anos."
          variant="geometric"
          buttons={[
            {
              text: 'Conheça as Associações',
              href: '/associacoes',
              variant: 'outline',
              icon: Users,
            },
            {
              text: 'Nossa História',
              href: '/historia',
              variant: 'secondary',
              icon: BookOpen,
            },
          ]}
        />
      </div>
    </main>
  );
}
