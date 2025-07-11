'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Users } from 'lucide-react';
import Link from 'next/link';
import { urlForImage } from '@/lib/images/sanity';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  sobre?: {
    titulo?: string;
    texto?: string;
    imagem?: {
      asset?: {
        _id: string;
        _type: string;
        url: string;
        metadata?: any;
      };
    };
  };
}

export function AboutSection({ sobre }: AboutSectionProps) {
  // Valores padrão caso o Sanity não retorne dados
  const titulo = sobre?.titulo || 'Tradição que Transcende Gerações';
  const texto =
    sobre?.texto ||
    'A Renda de Filé é mais do que uma técnica artesanal; é um patrimônio cultural que conecta gerações de mulheres trabalhadoras em Jaguaribe, Ceará. Esta arte delicada, que combina habilidade manual com criatividade infinita, tem sido transmitida de mãe para filha há mais de três séculos.\n\nCada peça conta uma história única, refletindo não apenas a técnica apurada da rendeira, mas também suas experiências, sonhos e a rica cultura local.';

  const imagemUrl = sobre?.imagem
    ? urlForImage(sobre.imagem, { width: 800, height: 600, quality: 90 }) ||
      sobre.imagem?.asset?.url ||
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1000'
    : 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=1000';

  // Dividir texto em parágrafos
  const paragrafos = texto.split('\n').filter(Boolean);

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
          {/* Conteúdo de texto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              {titulo}
            </h2>

            <div className="space-y-4 text-gray-600">
              {paragrafos.map((paragrafo, index) => (
                <p key={index} className="text-base leading-relaxed md:text-lg">
                  {paragrafo}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/historia">
                <Button
                  size="lg"
                  className="group gap-2 bg-renda-500 hover:bg-renda-600"
                >
                  <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Nossa História
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/associacoes">
                <Button
                  size="lg"
                  variant="outline"
                  className="group gap-2 border-renda-500 text-renda-600 hover:bg-renda-50"
                >
                  <Users className="h-5 w-5" />
                  Conheça as Rendeiras
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={imagemUrl}
                alt={
                  sobre?.imagem?.asset?.url
                    ? 'Sobre a Renda de Filé'
                    : 'Rendeira trabalhando na Renda de Filé'
                }
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={90}
              />

              {/* Overlay decorativo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Elemento decorativo */}
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 hidden rounded-full bg-renda-100 p-4 shadow-lg md:block">
                <Heart className="h-8 w-8 text-renda-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
