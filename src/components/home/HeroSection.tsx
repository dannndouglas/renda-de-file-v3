import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { urlForImage } from '@/lib/images/sanity';

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
    <section className="relative flex min-h-[600px] items-center overflow-hidden">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 to-black/30" />

      <div className="animate-slow-zoom absolute inset-0">
        <Image
          src={imagemUrl}
          alt={titulo}
          fill
          className="scale-110 object-cover"
          priority
          quality={90}
        />
      </div>

      <div className="container relative z-20 mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="animate-fade-up mb-4 text-4xl font-bold text-white md:text-6xl">
            {titulo}
          </h1>
          {subtituloPrimeiro && (
            <p className="animate-fade-up animation-delay-100 mb-8 text-xl text-white/90 md:text-2xl">
              {subtituloPrimeiro}
            </p>
          )}
          {subtituloTexto && (
            <p className="animate-fade-up animation-delay-200 mb-8 max-w-xl text-lg text-white/80">
              {subtituloTexto}
            </p>
          )}
          <div className="animate-fade-up animation-delay-300 flex flex-col gap-4 sm:flex-row">
            <Link href={ctaLink}>
              <Button
                size="lg"
                className="transform gap-2 transition-all hover:scale-105"
              >
                {ctaTexto}
                <ArrowRight className="animate-bounce-x h-5 w-5" />
              </Button>
            </Link>
            <Link href="/historia">
              <Button
                size="lg"
                variant="outline"
                className="transform gap-2 border-white bg-white/10 text-white transition-all hover:scale-105 hover:bg-white hover:text-gray-900"
              >
                <Heart className="h-5 w-5 animate-pulse" />
                Nossa História
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
