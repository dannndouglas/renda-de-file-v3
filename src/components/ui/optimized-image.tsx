/**
 * Componente de imagem otimizada
 * Wrapper around next/image with Sanity/Supabase integration
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import {
  urlForImageSize,
  urlForBlurPlaceholder,
  getImageMetadata,
  ImageSize,
  ImageQuality,
  getSizesAttribute,
  getOptimizedImageUrl,
  getPlaceholderUrl,
  IMAGE_CONFIG,
} from '@/lib/images';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  // Fonte da imagem (Sanity ou URL)
  src: SanityImageSource | string;
  alt: string;

  // Tamanho predefinido ou dimensões customizadas
  size?: ImageSize;
  width?: number;
  height?: number;

  // Qualidade da imagem
  quality?: ImageQuality;

  // Configurações do Next.js Image
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  placeholder?: 'blur' | 'empty';

  // Configurações de estilo
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;

  // Configurações de fallback
  fallbackSrc?: string;
  showPlaceholder?: boolean;
  placeholderText?: string;

  // Callbacks
  onLoad?: () => void;
  onError?: () => void;
  onClick?: () => void;

  // Supabase Storage (opcional)
  bucket?: string;
  path?: string;
}

export function OptimizedImage({
  src,
  alt,
  size = 'card',
  width,
  height,
  quality = 'card',
  fill = false,
  priority = false,
  sizes,
  placeholder = 'blur',
  className,
  objectFit = 'cover',
  objectPosition = 'center',
  fallbackSrc,
  showPlaceholder = true,
  placeholderText = 'Carregando imagem...',
  onLoad,
  onError,
  onClick,
  bucket,
  path,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [blurDataURL, setBlurDataURL] = useState<string>(
    IMAGE_CONFIG.placeholder.blurDataURL
  );

  // Determinar fonte e dimensões da imagem
  const { imageUrl, imageDimensions } = getImageSource();

  // Gerar placeholder blur
  useEffect(() => {
    if (typeof src === 'object' && src !== null) {
      // Sanity image - gerar blur placeholder
      const blurUrl = urlForBlurPlaceholder(src as SanityImageSource);
      if (blurUrl) {
        setBlurDataURL(blurUrl);
      }
    }
  }, [src]);

  function getImageSource() {
    // Supabase Storage
    if (bucket && path) {
      return {
        imageUrl: getOptimizedImageUrl(bucket, path, size, quality),
        imageDimensions: IMAGE_CONFIG.sizes[size],
      };
    }

    // Sanity Image
    if (typeof src === 'object' && src !== null) {
      const sanityUrl = urlForImageSize(
        src as SanityImageSource,
        size,
        quality
      );
      const metadata = getImageMetadata(src as SanityImageSource);

      return {
        imageUrl: sanityUrl,
        imageDimensions: {
          width: metadata?.width || IMAGE_CONFIG.sizes[size].width,
          height: metadata?.height || IMAGE_CONFIG.sizes[size].height,
        },
      };
    }

    // URL direta
    return {
      imageUrl: src as string,
      imageDimensions: IMAGE_CONFIG.sizes[size],
    };
  }

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  // Renderizar placeholder se houver erro
  if (imageError) {
    const fallbackUrl =
      fallbackSrc ||
      getPlaceholderUrl(
        width || imageDimensions.width,
        height || imageDimensions.height,
        placeholderText
      );

    return (
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-gray-100',
          className
        )}
        style={{
          width: fill ? '100%' : width || imageDimensions.width,
          height: fill ? '100%' : height || imageDimensions.height,
          aspectRatio: !fill && !width && !height ? '1' : undefined,
        }}
        onClick={onClick}
      >
        <Image
          src={fallbackUrl}
          alt={alt}
          fill={fill}
          width={!fill ? width || imageDimensions.width : undefined}
          height={!fill ? height || imageDimensions.height : undefined}
          className={cn(
            'object-cover',
            objectFit && `object-${objectFit}`,
            objectPosition && `object-${objectPosition}`
          )}
          onLoad={handleLoad}
        />
        {showPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-90">
            <span className="text-sm font-medium text-gray-500">
              {placeholderText}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Renderizar imagem normal
  if (!imageUrl) {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden bg-gray-100',
          className
        )}
        style={{
          width: fill ? '100%' : width || imageDimensions.width,
          height: fill ? '100%' : height || imageDimensions.height,
          aspectRatio: !fill && !width && !height ? '1' : undefined,
        }}
        onClick={onClick}
      >
        <span className="text-sm font-medium text-gray-500">
          Imagem não disponível
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt={alt}
        fill={fill}
        width={!fill ? width || imageDimensions.width : undefined}
        height={!fill ? height || imageDimensions.height : undefined}
        sizes={sizes || getSizesAttribute(size)}
        quality={IMAGE_CONFIG.quality[quality]}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? blurDataURL : undefined}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          objectFit && `object-${objectFit}`,
          objectPosition && `object-${objectPosition}`
        )}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Loading overlay */}
      {isLoading && showPlaceholder && (
        <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-gray-50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-renda-300 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
