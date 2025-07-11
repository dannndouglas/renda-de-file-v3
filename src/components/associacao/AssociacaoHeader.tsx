'use client';

import Image from 'next/image';
import { urlForImage } from '@/lib/images/sanity';
import type { Associacao } from '@/lib/sanity/types';

interface AssociacaoHeaderProps {
  associacao: Associacao;
}

export function AssociacaoHeader({ associacao }: AssociacaoHeaderProps) {
  const bannerUrl = associacao.banner
    ? urlForImage(associacao.banner, { width: 1920, height: 600, quality: 90 })
    : null;

  const logoUrl = associacao.logo
    ? urlForImage(associacao.logo, { width: 120, height: 120, quality: 90 })
    : null;

  return (
    <div className="relative">
      {/* Foto de capa */}
      <div className="relative h-48 bg-gradient-to-r from-amber-600 to-orange-600 md:h-64 lg:h-80">
        {bannerUrl && (
          <Image
            src={bannerUrl}
            alt={`Banner da ${associacao.nome}`}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Container com logo e informações */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-16 md:-mt-20">
          <div className="flex flex-col items-center text-center md:flex-row md:items-end md:text-left">
            {/* Logo da associação */}
            {logoUrl && (
              <div className="relative mb-4 h-24 w-24 md:mb-0 md:mr-6 md:h-32 md:w-32">
                <div className="overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                  <Image
                    src={logoUrl}
                    alt={`Logo da ${associacao.nome}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Informações principais */}
            <div className="flex-1 md:pb-6">
              <h1 className="mb-2 text-2xl font-bold text-white md:text-4xl">
                {associacao.nome}
              </h1>

              <div className="flex flex-col items-center gap-2 text-white/90 md:flex-row md:gap-6">
                <p className="flex items-center gap-2">
                  📍 {associacao.endereco?.cidade || 'N/A'}/
                  {associacao.endereco?.estado || 'N/A'}
                </p>

                {associacao.numeroMembros && (
                  <p className="flex items-center gap-2">
                    👥 {associacao.numeroMembros} membros
                  </p>
                )}

                {associacao.produtos && (
                  <p className="flex items-center gap-2">
                    📦 {associacao.produtos.length} produtos
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
