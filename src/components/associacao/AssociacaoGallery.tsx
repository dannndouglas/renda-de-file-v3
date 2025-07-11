'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, Images } from 'lucide-react';
import { urlForImage } from '@/lib/images/sanity';
import type { SanityImage } from '@/lib/sanity/types';

interface AssociacaoGalleryProps {
  galeria: SanityImage[];
  nomeAssociacao: string;
}

export function AssociacaoGallery({
  galeria,
  nomeAssociacao,
}: AssociacaoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedImages = showAll ? galeria : galeria.slice(0, 6);

  const openModal = (index: number) => {
    setSelectedImage(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galeria.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galeria.length - 1 : selectedImage - 1
      );
    }
  };

  if (!galeria || galeria.length === 0) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="rounded-lg bg-purple-100 p-2">
              <Images className="h-6 w-6 text-purple-600" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Galeria
            </span>
            <Badge variant="secondary" className="ml-auto">
              {galeria.length} fotos
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {displayedImages.map((imagem, index) => {
              const imageUrl = urlForImage(imagem, {
                width: 400,
                height: 400,
                quality: 85,
              });

              return (
                <div
                  key={index}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  onClick={() => openModal(index)}
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={
                        imagem.alt || `Foto ${index + 1} da ${nomeAssociacao}`
                      }
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  {/* Hover overlay with number */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-900">
                      {index + 1} / {galeria.length}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {galeria.length > 6 && !showAll && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => setShowAll(true)}
                className="group gap-2 border-purple-200 bg-purple-50 text-purple-700 transition-all hover:bg-purple-100 hover:border-purple-300"
              >
                <Images className="h-4 w-4 transition-transform group-hover:scale-110" />
                Ver todas as {galeria.length} fotos
              </Button>
            </div>
          )}

          {showAll && galeria.length > 6 && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => setShowAll(false)}
                className="gap-2 border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Mostrar menos
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de visualização */}
      <Dialog open={selectedImage !== null} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>Galeria de fotos da {nomeAssociacao}</DialogTitle>
          </DialogHeader>

          {selectedImage !== null && (
            <div className="relative">
              {/* Botão fechar */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 bg-black/20 text-white hover:bg-black/40"
                onClick={closeModal}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Navegação anterior */}
              {galeria.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}

              {/* Navegação próxima */}
              {galeria.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              )}

              {/* Imagem */}
              <div className="relative aspect-[4/3] bg-black">
                {urlForImage(galeria[selectedImage], {
                  width: 1200,
                  height: 900,
                  quality: 90,
                }) && (
                  <Image
                    src={
                      urlForImage(galeria[selectedImage], {
                        width: 1200,
                        height: 900,
                        quality: 90,
                      })!
                    }
                    alt={
                      galeria[selectedImage].alt ||
                      `Foto ${selectedImage + 1} da ${nomeAssociacao}`
                    }
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              {/* Contador de imagens */}
              {galeria.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
                  {selectedImage + 1} / {galeria.length}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
