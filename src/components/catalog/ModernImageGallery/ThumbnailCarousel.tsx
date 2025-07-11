'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { urlForImage } from '@/lib/images/sanity';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ThumbnailCarouselProps {
  images: Array<{
    asset: {
      url: string;
    };
    alt?: string;
  }>;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export function ThumbnailCarousel({
  images,
  selectedIndex,
  onSelect,
}: ThumbnailCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scroll automaticamente para a miniatura selecionada
  useEffect(() => {
    const selectedThumbnail = thumbnailRefs.current[selectedIndex];
    if (selectedThumbnail && carouselRef.current) {
      const container = carouselRef.current;
      const containerWidth = container.offsetWidth;
      const thumbnailLeft = selectedThumbnail.offsetLeft;
      const thumbnailWidth = selectedThumbnail.offsetWidth;
      const scrollLeft = thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [selectedIndex]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 200;
      const newScrollPosition =
        carouselRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  if (images.length <= 1) return null;

  return (
    <div className="relative">
      {/* Botão de navegação esquerda */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 shadow-md hover:bg-white"
        onClick={() => handleScroll('left')}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Carrossel de miniaturas */}
      <div
        ref={carouselRef}
        className="flex gap-2 overflow-x-auto scroll-smooth py-2 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => (
          <button
            key={index}
            ref={(el) => {
              thumbnailRefs.current[index] = el;
            }}
            onClick={() => onSelect(index)}
            className={cn(
              'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
              selectedIndex === index
                ? 'border-orange-500 ring-2 ring-orange-500/20'
                : 'border-gray-200 hover:border-gray-300'
            )}
          >
            <Image
              src={
                urlForImage(image, {
                  width: 150,
                  height: 150,
                  quality: 75,
                }) || image.asset.url
              }
              alt={image.alt || `Miniatura ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
            {selectedIndex === index && (
              <div className="absolute inset-0 bg-orange-500/10" />
            )}
          </button>
        ))}
      </div>

      {/* Botão de navegação direita */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 shadow-md hover:bg-white"
        onClick={() => handleScroll('right')}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}