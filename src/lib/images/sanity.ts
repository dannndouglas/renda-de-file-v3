/**
 * Utilitários para otimização de imagens do Sanity
 * Integração com Sanity Image URLs e transformações
 */

import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from '@/lib/sanity/client';
import { IMAGE_CONFIG, ImageSize, ImageQuality } from './config';
import { getOptimalQuality, resizeWithAspectRatio } from './utils';

// Inicializa o builder de URLs de imagem do Sanity
const builder = imageUrlBuilder(sanityClient);

/**
 * Interface para opções de transformação de imagem
 */
interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: string;
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  crop?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'focalpoint';
  auto?: 'format';
  dpr?: number;
  blur?: number;
  sharpen?: number;
}

/**
 * Gera URL otimizada para imagem do Sanity
 */
export function urlForImage(
  source: SanityImageSource,
  options: ImageTransformOptions = {}
) {
  if (!source) return null;

  let imageBuilder = builder.image(source);

  // Aplicar transformações
  if (options.width) imageBuilder = imageBuilder.width(options.width);
  if (options.height) imageBuilder = imageBuilder.height(options.height);
  if (options.quality) imageBuilder = imageBuilder.quality(options.quality);
  if (options.format) imageBuilder = imageBuilder.format(options.format as any);
  if (options.fit) imageBuilder = imageBuilder.fit(options.fit);
  if (options.crop) imageBuilder = imageBuilder.crop(options.crop);
  if (options.auto) imageBuilder = imageBuilder.auto(options.auto);
  if (options.dpr) imageBuilder = imageBuilder.dpr(options.dpr);
  if (options.blur) imageBuilder = imageBuilder.blur(options.blur);
  if (options.sharpen) imageBuilder = imageBuilder.sharpen(options.sharpen);

  return imageBuilder.url();
}

/**
 * Gera URL otimizada baseada no tamanho predefinido
 */
export function urlForImageSize(
  source: SanityImageSource,
  size: ImageSize,
  quality: ImageQuality = 'card'
): string | null {
  if (!source) return null;

  const dimensions = IMAGE_CONFIG.sizes[size];
  const optimalQuality = IMAGE_CONFIG.quality[quality];

  return urlForImage(source, {
    width: dimensions.width,
    height: dimensions.height,
    quality: optimalQuality,
    format: 'webp',
    fit: 'crop',
    crop: 'center',
    auto: 'format',
  });
}

/**
 * Gera múltiplas URLs para srcset responsivo
 */
export function generateSanityImageSrcSet(
  source: SanityImageSource,
  widths: number[],
  quality: number = 75
): string | null {
  if (!source) return null;

  const srcsetUrls = widths
    .map((width) => {
      const url = urlForImage(source, {
        width,
        quality,
        format: 'webp',
        fit: 'crop',
        crop: 'center',
        auto: 'format',
      });
      return url ? `${url} ${width}w` : null;
    })
    .filter(Boolean);

  return srcsetUrls.length > 0 ? srcsetUrls.join(', ') : null;
}

/**
 * Gera URL de placeholder blur
 */
export function urlForBlurPlaceholder(
  source: SanityImageSource,
  width: number = 20,
  height: number = 20
): string | null {
  if (!source) return null;

  return urlForImage(source, {
    width,
    height,
    blur: 50,
    quality: 20,
    format: 'jpg',
    fit: 'crop',
    crop: 'center',
  });
}

/**
 * Extrai metadados da imagem do Sanity
 */
export function getImageMetadata(source: SanityImageSource): {
  width?: number;
  height?: number;
  aspectRatio?: number;
  format?: string;
  size?: number;
  alt?: string;
} | null {
  if (!source || typeof source !== 'object') return null;

  const asset = 'asset' in source ? source.asset : source;
  if (!asset || typeof asset !== 'object') return null;

  const metadata = 'metadata' in asset ? asset.metadata : null;
  if (!metadata) return null;

  return {
    width: metadata.dimensions?.width,
    height: metadata.dimensions?.height,
    aspectRatio: metadata.dimensions?.aspectRatio,
    format: metadata.format,
    size: metadata.size,
    alt: 'alt' in source ? source.alt : undefined,
  };
}

/**
 * Valida se a imagem do Sanity tem as dimensões mínimas
 */
export function validateImageDimensions(
  source: SanityImageSource,
  minWidth: number,
  minHeight: number
): boolean {
  const metadata = getImageMetadata(source);
  if (!metadata?.width || !metadata?.height) return false;

  return metadata.width >= minWidth && metadata.height >= minHeight;
}

/**
 * Gera conjunto completo de URLs para diferentes contextos
 */
export function generateImageSet(source: SanityImageSource) {
  if (!source) return null;

  const metadata = getImageMetadata(source);

  return {
    // URLs para diferentes tamanhos
    thumbnail: urlForImageSize(source, 'thumbnail', 'thumbnail'),
    card: urlForImageSize(source, 'card', 'card'),
    hero: urlForImageSize(source, 'hero', 'hero'),
    gallery: urlForImageSize(source, 'gallery', 'gallery'),

    // URLs para diferentes qualidades
    lowQuality: urlForImage(source, {
      width: 800,
      quality: 40,
      format: 'webp',
    }),
    mediumQuality: urlForImage(source, {
      width: 1200,
      quality: 75,
      format: 'webp',
    }),
    highQuality: urlForImage(source, {
      width: 1920,
      quality: 90,
      format: 'webp',
    }),

    // Placeholder blur
    blurPlaceholder: urlForBlurPlaceholder(source),

    // Srcsets responsivos
    srcSet: generateSanityImageSrcSet(source, [400, 800, 1200, 1920]),

    // Metadados
    metadata,
  };
}

/**
 * Hook para carregar imagem do Sanity com fallback
 */
export function loadSanityImage(
  source: SanityImageSource,
  options: ImageTransformOptions = {}
): Promise<{ url: string; metadata: any }> {
  return new Promise((resolve, reject) => {
    const url = urlForImage(source, options);
    if (!url) {
      reject(new Error('Não foi possível gerar URL da imagem'));
      return;
    }

    const img = new Image();
    img.onload = () =>
      resolve({
        url,
        metadata: getImageMetadata(source),
      });
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Converte imagem Sanity para base64 (para SSR)
 */
export async function sanityImageToBase64(
  source: SanityImageSource,
  width: number = 20,
  height: number = 20
): Promise<string> {
  const url = urlForImage(source, {
    width,
    height,
    quality: 20,
    format: 'jpg',
    fit: 'crop',
    crop: 'center',
  });

  if (!url) {
    return IMAGE_CONFIG.placeholder.blurDataURL;
  }

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error('Erro ao converter imagem para base64:', error);
    return IMAGE_CONFIG.placeholder.blurDataURL;
  }
}
