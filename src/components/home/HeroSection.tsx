import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[600px] items-center">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 to-black/30" />

      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=2340"
          alt="Renda de Filé"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      <div className="container relative z-20 mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Renda de Filé
          </h1>
          <p className="mb-8 text-xl text-white/90 md:text-2xl">
            Arte secular das mãos habilidosas de Jaguaribe
          </p>
          <p className="mb-8 max-w-xl text-lg text-white/80">
            Há mais de 300 anos, as rendeiras de Jaguaribe preservam esta
            tradição única, criando peças delicadas que contam histórias e
            encantam gerações.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/catalogo">
              <Button size="lg" className="gap-2">
                Explorar Catálogo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/historia">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white bg-white/10 text-white hover:bg-white hover:text-gray-900"
              >
                <Heart className="h-5 w-5" />
                Nossa História
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
