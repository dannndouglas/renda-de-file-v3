'use client';

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
import { useStaggeredScrollReveal } from '@/hooks/useScrollReveal';
import { useEffect } from 'react';

interface ClientHomePageProps {
  homeData: any;
}

export default function ClientHomePage({ homeData }: ClientHomePageProps) {
  const produtosRef = useStaggeredScrollReveal({ 
    staggerDelay: 150,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  const noticiasRef = useStaggeredScrollReveal({ 
    staggerDelay: 100,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  const { produtos, stats, noticias, paginaInicial, configuracoes } = homeData || {};

  useEffect(() => {
    // Garante que os títulos das seções sejam sempre visíveis
    const sectionHeaders = document.querySelectorAll('h2, h3') as NodeListOf<HTMLElement>;
    sectionHeaders.forEach((header) => {
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
    });

    // Adiciona animação apenas aos elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.card-3d, .product-card, article');
    animatedElements.forEach((element) => {
      element.classList.add('animate-in');
    });
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection hero={paginaInicial?.hero} />

      {/* Estatísticas */}
      <StatsSection
        rendeiras={stats?.rendeiras || 0}
        produtos={stats?.produtos || 0}
        anosTradicao={stats?.anos || 300}
        estatisticasCustomizadas={paginaInicial?.estatisticas}
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

          <div ref={produtosRef} className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {produtos?.map((produto: any, index: number) => (
              <div
                key={produto._id}
                className="card-3d scroll-reveal"
              >
                <ProductCard produto={produto} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/catalogo">
              <Button size="lg" className="ripple gap-2 hover:shadow-lg transition-all duration-300">
                Ver Catálogo Completo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Notícias Recentes */}
      {noticias && noticias.length > 0 && (
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

            <div ref={noticiasRef} className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {noticias.map((noticia: Noticia, index: number) => (
                <article
                  key={noticia._id}
                  className="card-3d hover-lift scroll-reveal overflow-hidden rounded-lg bg-white shadow-md"
                >
                  <Link href={`/noticias/${noticia.slug.current}`}>
                    <div className="card-3d-content">
                      {noticia.imagemPrincipal && (
                        <div className="relative aspect-video bg-gray-200 overflow-hidden">
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
                            className="object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <time className="text-sm text-gray-500">
                          {new Date(noticia.dataPublicacao).toLocaleDateString(
                            'pt-BR'
                          )}
                        </time>
                        <h3 className="mb-3 mt-2 text-xl font-semibold text-gray-900 transition-colors duration-300 hover:text-orange-600">
                          {noticia.titulo}
                        </h3>
                        <p className="line-clamp-3 text-gray-600">
                          {noticia.resumo}
                        </p>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <div className="text-center">
              <Link href="/noticias">
                <Button variant="outline" size="lg" className="ripple gap-2 hover:shadow-lg transition-all duration-300">
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