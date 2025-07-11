'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Images className="h-6 w-6" />
            Galeria de Fotos ({galeria.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {displayedImages.map((imagem, index) => {
              const imageUrl = urlForImage(imagem, {
                width: 300,
                height: 300,
                quality: 80,
              });

              return (
                <div
                  key={index}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                  onClick={() => openModal(index)}
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={
                        imagem.alt || `Foto ${index + 1} da ${nomeAssociacao}`
                      }
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />
                </div>
              );
            })}
          </div>

          {galeria.length > 6 && !showAll && (
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => setShowAll(true)}
                className="gap-2"
              >
                <Images className="h-4 w-4" />
                Ver todas as fotos ({galeria.length})
              </Button>
            </div>
          )}

          {showAll && galeria.length > 6 && (
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => setShowAll(false)}
                className="gap-2"
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
