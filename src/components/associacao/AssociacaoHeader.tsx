'use client';

import Image from 'next/image';
import { MapPin, Users, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
    ? urlForImage(associacao.logo, { width: 160, height: 160, quality: 90 })
    : null;

  return (
    <header className="relative overflow-hidden" role="banner">
      {/* Hero Background */}
      <div className="relative h-56 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 md:h-72 lg:h-96">
        {bannerUrl && (
          <Image
            src={bannerUrl}
            alt={`Banner da associação ${associacao.nome}`}
            fill
            className="object-cover"
            priority
          />
        )}
        
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" aria-hidden="true" />
        
        {/* Decorative elements */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-xl" aria-hidden="true" />
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-2xl" aria-hidden="true" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:flex-row md:items-end md:space-y-0 md:space-x-8 md:text-left">
            
            {/* Logo Circle */}
            {logoUrl && (
              <div className="relative p-4">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36 lg:h-40 lg:w-40">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-gray-50 p-1 shadow-2xl">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
                      <Image
                        src={logoUrl}
                        alt={`Logo da ${associacao.nome}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute bottom-2 right-2">
                  <Badge className="bg-green-500 text-white shadow-lg hover:bg-green-600">
                    Ativa
                  </Badge>
                </div>
              </div>
            )}

            {/* Association Information */}
            <div className="flex-1 space-y-4 md:pb-8">
              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  {associacao.nome}
                </h1>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:justify-start md:gap-6" role="list" aria-label="Informações da associação">
                {associacao.endereco?.cidade && (
                  <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm text-white backdrop-blur-sm" role="listitem">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    <span className="font-medium" aria-label={`Localização: ${associacao.endereco.cidade}, ${associacao.endereco.estado}`}>
                      {associacao.endereco.cidade}/{associacao.endereco.estado}
                    </span>
                  </div>
                )}

                {associacao.numeroMembros && (
                  <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm text-white backdrop-blur-sm" role="listitem">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    <span className="font-medium" aria-label={`Número de membros: ${associacao.numeroMembros}`}>
                      {associacao.numeroMembros} membros
                    </span>
                  </div>
                )}

                {associacao.produtos && associacao.produtos.length > 0 && (
                  <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm text-white backdrop-blur-sm" role="listitem">
                    <Package className="h-4 w-4" aria-hidden="true" />
                    <span className="font-medium" aria-label={`Número de produtos: ${associacao.produtos.length}`}>
                      {associacao.produtos.length} produtos
                    </span>
                  </div>
                )}
              </div>

              {/* Specialties Tags */}
              {associacao.especialidades && associacao.especialidades.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  {associacao.especialidades.slice(0, 3).map((especialidade, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                    >
                      {especialidade}
                    </Badge>
                  ))}
                  {associacao.especialidades.length > 3 && (
                    <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                      +{associacao.especialidades.length - 3} mais
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
