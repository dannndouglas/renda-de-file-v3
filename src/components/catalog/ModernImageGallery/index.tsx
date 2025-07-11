'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Expand, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { urlForImage } from '@/lib/images/sanity';
import { ThumbnailCarousel } from './ThumbnailCarousel';
import { FullscreenModal } from './FullscreenModal';
import { motion } from 'framer-motion';

interface ModernImageGalleryProps {
  images?: Array<{
    asset: {
      url: string;
    };
    alt?: string;
  }>;
}

export function ModernImageGallery({ images = [] }: ModernImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100">
        <p className="text-gray-400">Sem imagens</p>
      </div>
    );
  }

  const currentImage = images[selectedIndex];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-4">
      {/* Imagem Principal */}
      <motion.div
        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-lg"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Image
          src={
            urlForImage(currentImage, {
              width: 800,
              height: 800,
              quality: 90,
            }) || currentImage.asset.url
          }
          alt={currentImage.alt || 'Imagem do produto'}
          fill
          className="object-contain cursor-pointer transition-transform duration-300"
          onClick={() => setIsFullscreen(true)}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Overlay de hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"
        />

        {/* Botão de expandir */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8 
          }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm hover:bg-white"
          onClick={() => setIsFullscreen(true)}
        >
          <Expand className="h-4 w-4" />
          Ampliar
        </motion.button>

        {/* Indicador de zoom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <ZoomIn className="h-8 w-8 text-white" />
          </div>
        </motion.div>

        {/* Contador de imagens */}
        {images.length > 1 && (
          <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>

      {/* Carrossel de Miniaturas */}
      <ThumbnailCarousel
        images={images}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      {/* Modal Fullscreen */}
      <FullscreenModal
        images={images}
        selectedIndex={selectedIndex}
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}