/**
 * Exportações centralizadas para utilitários de imagem
 * Ponto de entrada principal para otimização de imagens
 */

// Configurações
export {
  IMAGE_CONFIG,
  type ImageFormat,
  type ImageSize,
  type ImageQuality,
} from './config';

// Utilitários gerais
export {
  generateBlurDataURL,
  getResponsiveDimensions,
  getSizesAttribute,
  getOptimalQuality,
  formatFileSize,
  isValidImageFile,
  calculateAspectRatio,
  resizeWithAspectRatio,
  generateSrcSet,
  supportsAVIF,
  supportsWebP,
  getBestImageFormat,
  loadImage,
  extractDominantColor,
} from './utils';

// Integração Sanity
export {
  urlForImage,
  urlForImageSize,
  generateSanityImageSrcSet,
  urlForBlurPlaceholder,
  getImageMetadata,
  validateImageDimensions,
  generateImageSet,
  loadSanityImage,
  sanityImageToBase64,
} from './sanity';

// Integração Supabase
export {
  uploadImage,
  getTransformedImageUrl,
  getOptimizedImageUrl,
  listImages,
  deleteImage,
  getPlaceholderUrl,
} from './supabase';

// Constantes úteis
export const COMMON_ASPECT_RATIOS = {
  SQUARE: 1,
  LANDSCAPE: 16 / 9,
  PORTRAIT: 9 / 16,
  GOLDEN: 1.618,
  PRODUCT: 4 / 3,
} as const;

export const DEVICE_PIXEL_RATIOS = {
  STANDARD: 1,
  RETINA: 2,
  HIGH_DPI: 3,
} as const;
