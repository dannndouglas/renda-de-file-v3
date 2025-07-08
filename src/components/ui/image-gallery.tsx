/**
 * Componente de galeria de imagens otimizada
 * Galeria responsiva com zoom e navegação
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { OptimizedImage } from './optimized-image';
import { Button } from './button';
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: Array<{
    src: SanityImageSource | string;
    alt: string;
    caption?: string;
  }>;
  className?: string;
  showThumbnails?: boolean;
  showCaptions?: boolean;
  enableZoom?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onImageClick?: (index: number) => void;
}

export function ImageGallery({
  images,
  className,
  showThumbnails = true,
  showCaptions = true,
  enableZoom = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  onImageClick,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const currentImage = images[currentIndex];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isModalOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isModalOpen, autoPlayInterval, images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoomLevel(1);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoomLevel(1);
  }, [images.length]);

  const handleImageClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      onImageClick?.(index);
      setIsModalOpen(true);
    },
    [onImageClick]
  );

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5));
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          setIsModalOpen(false);
          break;
        case '+':
        case '=':
          handleZoomIn();
          break;
        case '-':
          handleZoomOut();
          break;
      }
    },
    [isModalOpen, goToPrevious, goToNext, handleZoomIn, handleZoomOut]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (images.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        Nenhuma imagem disponível
      </div>
    );
  }

  return (
    <div className={cn('image-gallery', className)}>
      {/* Imagem principal */}
      <div className="group relative mb-4">
        <OptimizedImage
          src={currentImage.src}
          alt={currentImage.alt}
          size="gallery"
          quality="gallery"
          fill
          className="aspect-square cursor-pointer"
          onClick={() => handleImageClick(currentIndex)}
        />

        {/* Controles de navegação */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Botão de zoom */}
        {enableZoom && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
            onClick={() => setIsModalOpen(true)}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        )}

        {/* Indicadores */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'h-2 w-2 rounded-full transition-colors',
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}

        {/* Controle de autoplay */}
        {autoPlay && images.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? '⏸️' : '▶️'}
          </Button>
        )}
      </div>

      {/* Legenda */}
      {showCaptions && currentImage.caption && (
        <p className="mb-4 text-center text-sm text-gray-600">
          {currentImage.caption}
        </p>
      )}

      {/* Miniaturas */}
      {showThumbnails && images.length > 1 && (
        <div className="mx-auto grid max-w-md grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                'relative aspect-square overflow-hidden rounded-lg border-2 transition-colors',
                index === currentIndex
                  ? 'border-renda-500'
                  : 'border-transparent hover:border-renda-300'
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                size="thumbnail"
                quality="thumbnail"
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal de zoom */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="h-full w-full max-w-none bg-black/90 p-0">
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Imagem ampliada */}
            <div
              className="relative transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <OptimizedImage
                src={currentImage.src}
                alt={currentImage.alt}
                size="gallery"
                quality="gallery"
                width={800}
                height={800}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
            </div>

            {/* Controles do modal */}
            <div className="absolute right-4 top-4 flex space-x-2">
              {enableZoom && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 text-white hover:bg-black/70"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 0.5}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 text-white hover:bg-black/70"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 text-white hover:bg-black/70"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navegação do modal */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={goToNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Legenda no modal */}
            {showCaptions && currentImage.caption && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/50 px-4 py-2 text-white">
                {currentImage.caption}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
