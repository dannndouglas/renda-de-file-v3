import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
      
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

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Renda de Filé
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Arte secular das mãos habilidosas de Jaguaribe
          </p>
          <p className="text-lg text-white/80 mb-8 max-w-xl">
            Há mais de 300 anos, as rendeiras de Jaguaribe preservam esta tradição única, 
            criando peças delicadas que contam histórias e encantam gerações.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/catalogo">
              <Button size="lg" className="gap-2">
                Explorar Catálogo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/historia">
              <Button size="lg" variant="outline" className="gap-2 bg-white/10 text-white border-white hover:bg-white hover:text-gray-900">
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