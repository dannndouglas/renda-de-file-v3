/**
 * Utilitários para otimização de imagens
 * Funções para processar, redimensionar e otimizar imagens
 */

import { IMAGE_CONFIG, ImageSize, ImageQuality } from './config';

/**
 * Gera uma blur data URL para placeholder
 */
export function generateBlurDataURL(
  width: number = 10,
  height: number = 10,
  color: string = '#f3f4f6'
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return IMAGE_CONFIG.placeholder.blurDataURL;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.1);
}

/**
 * Calcula dimensões responsivas baseadas no tamanho
 */
export function getResponsiveDimensions(size: ImageSize) {
  const baseDimensions = IMAGE_CONFIG.sizes[size];

  return {
    ...baseDimensions,
    // Gera sizes attribute para responsive images
    sizes: getSizesAttribute(size),
  };
}

/**
 * Gera o atributo sizes para imagens responsivas
 */
export function getSizesAttribute(size: ImageSize): string {
  switch (size) {
    case 'thumbnail':
      return '(max-width: 768px) 150px, 150px';
    case 'card':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px';
    case 'hero':
      return '100vw';
    case 'gallery':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px';
    case 'association':
      return '(max-width: 768px) 100px, 200px';
    case 'avatar':
      return '64px';
    default:
      return '100vw';
  }
}

/**
 * Calcula a qualidade ideal baseada no contexto
 */
export function getOptimalQuality(
  context: ImageQuality,
  isRetina: boolean = false
): number {
  const baseQuality = IMAGE_CONFIG.quality[context];

  // Reduz qualidade para displays retina para balancear tamanho/qualidade
  if (isRetina && baseQuality > 75) {
    return Math.max(baseQuality - 10, 60);
  }

  return baseQuality;
}

/**
 * Converte bytes para formato legível
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Valida se um arquivo é uma imagem válida
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  return validTypes.includes(file.type);
}

/**
 * Calcula aspect ratio de uma imagem
 */
export function calculateAspectRatio(width: number, height: number): number {
  return width / height;
}

/**
 * Redimensiona dimensões mantendo aspect ratio
 */
export function resizeWithAspectRatio(
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number
): { width: number; height: number } {
  const aspectRatio = calculateAspectRatio(originalWidth, originalHeight);

  if (targetWidth && targetHeight) {
    // Se ambas as dimensões foram especificadas, usa a menor escala
    const scaleX = targetWidth / originalWidth;
    const scaleY = targetHeight / originalHeight;
    const scale = Math.min(scaleX, scaleY);

    return {
      width: Math.round(originalWidth * scale),
      height: Math.round(originalHeight * scale),
    };
  }

  if (targetWidth) {
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio),
    };
  }

  if (targetHeight) {
    return {
      width: Math.round(targetHeight * aspectRatio),
      height: targetHeight,
    };
  }

  return { width: originalWidth, height: originalHeight };
}

/**
 * Gera srcset para imagens responsivas
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[],
  quality: number = 75
): string {
  return widths
    .map((width) => `${baseUrl}?w=${width}&q=${quality} ${width}w`)
    .join(', ');
}

/**
 * Detecta se o dispositivo suporta AVIF
 */
export function supportsAVIF(): boolean {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
}

/**
 * Detecta se o dispositivo suporta WebP
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Retorna o melhor formato de imagem suportado
 */
export function getBestImageFormat(): string {
  if (supportsAVIF()) return 'avif';
  if (supportsWebP()) return 'webp';
  return 'jpeg';
}

/**
 * Cria uma promise que resolve quando a imagem carrega
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Extrai cores dominantes de uma imagem (simplificado)
 */
export function extractDominantColor(
  imageElement: HTMLImageElement
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      resolve(IMAGE_CONFIG.placeholder.backgroundColor);
      return;
    }

    canvas.width = imageElement.width;
    canvas.height = imageElement.height;

    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r = 0,
      g = 0,
      b = 0;
    let pixelCount = 0;

    // Amostra cada 4º pixel para performance
    for (let i = 0; i < data.length; i += 16) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      pixelCount++;
    }

    r = Math.round(r / pixelCount);
    g = Math.round(g / pixelCount);
    b = Math.round(b / pixelCount);

    resolve(`rgb(${r}, ${g}, ${b})`);
  });
}
