'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { urlForImage } from '@/lib/images/sanity';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  hero?: {
    titulo?: string;
    subtitulo?: string;
    imagem?: {
      asset?: {
        _id: string;
        _type: string;
        url: string;
        metadata?: any;
      };
    };
    cta?: {
      texto?: string;
      link?: string;
    };
  };
}

export function HeroSection({ hero }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = document
        .querySelector('.hero-container')
        ?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((mouseEvent.clientX - rect.left) / rect.width) * 100,
          y: ((mouseEvent.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroContainer = document.querySelector('.hero-container');
    if (heroContainer) {
      heroContainer.addEventListener('mousemove', handleMouseMove);
    }

    setIsLoaded(true);

    return () => {
      if (heroContainer) {
        heroContainer.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Valores padrão caso o Sanity não retorne dados
  const titulo = hero?.titulo || 'Renda de Filé';
  const subtitulo =
    hero?.subtitulo ||
    'Arte secular das mãos habilidosas de Jaguaribe\n\nHá mais de 300 anos, as rendeiras de Jaguaribe preservam esta tradição única, criando peças delicadas que contam histórias e encantam gerações.';
  const ctaTexto = hero?.cta?.texto || 'Explorar Catálogo';
  const ctaLink = hero?.cta?.link || '/catalogo';

  // Usar imagem do Sanity se disponível, senão usar a imagem padrão
  const imagemUrl = hero?.imagem
    ? urlForImage(hero.imagem, { width: 2340, quality: 90 }) ||
      hero.imagem?.asset?.url ||
      'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2340'
    : 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2340';

  // Separar subtítulo em duas partes (primeira linha e texto adicional)
  const [subtituloPrimeiro, ...subtituloResto] = subtitulo
    .split('\n')
    .filter(Boolean);
  const subtituloTexto = subtituloResto.join(' ');

  return (
    <section className="hero-container relative flex min-h-[500px] items-center overflow-hidden md:min-h-[700px]">
      {/* Floating particles */}
      <div className="z-5 absolute inset-0">
        <div className="floating-particles">
          <div
            className="particle"
            style={{ left: '10%', animationDelay: '0s' }}
          ></div>
          <div
            className="particle"
            style={{ left: '20%', animationDelay: '1s' }}
          ></div>
          <div
            className="particle"
            style={{ left: '30%', animationDelay: '2s' }}
          ></div>
          <div
            className="particle"
            style={{ left: '40%', animationDelay: '3s' }}
          ></div>
          <div
            className="particle"
            style={{ left: '50%', animationDelay: '4s' }}
          ></div>
          <div
            className="particle"
            style={{ left: '60%', animationDelay: '5s' }}
          ></div>
          <div
            className="particle"
            style={{ left: '70%', animationDelay: '6s' }}
          ></div>
          <div
            className="particle"
            style={{ left: '80%', animationDelay: '7s' }}
          ></div>
          <div
            className="particle"
            style={{ left: '90%', animationDelay: '8s' }}
          ></div>
        </div>
      </div>

      {/* Parallax background layers */}
      <div className="z-1 absolute inset-0">
        <div
          className="absolute inset-0 transform-gpu bg-gradient-to-br from-renda-900/20 to-renda-700/20"
          style={{
            transform: `translate3d(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px, 0)`,
          }}
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-black/50" />

      <div className="animate-slow-zoom z-2 absolute inset-0">
        <Image
          src={imagemUrl}
          alt={titulo}
          fill
          className="scale-110 transform-gpu object-cover"
          priority
          quality={90}
          style={{
            transform: `translate3d(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px, 0) scale(1.1)`,
          }}
        />
      </div>

      {/* Glassmorphism overlay */}
      <div className="z-15 absolute inset-0 bg-gradient-to-r from-white/5 to-transparent backdrop-blur-[0.5px]" />

      <div className="container relative z-20 mx-auto px-4">
        <div className="max-w-3xl">
          <h1
            className={`mb-4 text-3xl font-bold leading-tight text-white md:mb-6 md:text-7xl lg:text-8xl ${
              isLoaded ? 'animate-hero-title' : 'opacity-0'
            }`}
          >
            {titulo}
          </h1>
          {subtituloPrimeiro && (
            <p
              className={`mb-6 text-lg font-light text-white/95 md:mb-8 md:text-3xl lg:text-4xl ${
                isLoaded ? 'animate-hero-subtitle' : 'opacity-0'
              }`}
            >
              {subtituloPrimeiro}
            </p>
          )}
          {subtituloTexto && (
            <p
              className={`mb-8 max-w-2xl text-base leading-relaxed text-white/85 md:mb-10 md:text-xl ${
                isLoaded ? 'animate-hero-description' : 'opacity-0'
              }`}
            >
              {subtituloTexto}
            </p>
          )}
          <div
            className={`flex flex-col gap-4 sm:flex-row ${
              isLoaded ? 'animate-hero-buttons' : 'opacity-0'
            }`}
          >
            <Link href={ctaLink}>
              <Button
                size="lg"
                className="hero-button-primary group relative overflow-hidden px-6 py-3 text-base font-semibold md:px-8 md:py-4 md:text-lg"
              >
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  {ctaTexto}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-renda-500 to-renda-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </Link>
            <Link href="/historia">
              <Button
                size="lg"
                variant="outline"
                className="hero-button-secondary group relative overflow-hidden border-2 border-white/30 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm md:px-8 md:py-4 md:text-lg"
              >
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  <Heart className="h-4 w-4 transition-transform group-hover:scale-110 md:h-5 md:w-5" />
                  Nossa História
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
