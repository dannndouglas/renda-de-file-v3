/**
 * Utilitários para otimização de imagens do Supabase Storage
 * Upload, transformação e otimização de imagens
 */

import { supabase } from '@/lib/supabase/client';
import { IMAGE_CONFIG, ImageSize, ImageQuality } from './config';
import {
  getOptimalQuality,
  resizeWithAspectRatio,
  isValidImageFile,
} from './utils';

/**
 * Interface para opções de upload
 */
interface UploadOptions {
  bucket: string;
  path: string;
  file: File;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  generateThumbnails?: boolean;
}

/**
 * Interface para opções de transformação
 */
interface TransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: string;
  resize?: 'cover' | 'contain' | 'fill';
}

/**
 * Faz upload de imagem para o Supabase Storage
 */
export async function uploadImage(options: UploadOptions): Promise<{
  success: boolean;
  url?: string;
  path?: string;
  error?: string;
}> {
  const { bucket, path, file, maxWidth, maxHeight, quality, format } = options;

  // Validar arquivo
  if (!isValidImageFile(file)) {
    return { success: false, error: 'Tipo de arquivo inválido' };
  }

  try {
    let processedFile = file;

    // Processar imagem se necessário
    if (maxWidth || maxHeight || quality || format) {
      processedFile = await processImage(file, {
        width: maxWidth,
        height: maxHeight,
        quality: quality || 80,
        format: format || 'webp',
      });
    }

    // Upload para o Supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, processedFile, {
        cacheControl: '31536000', // 1 ano
        upsert: true,
      });

    if (error) {
      return { success: false, error: error.message };
    }

    // Gerar URL pública
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    // Gerar thumbnails se solicitado
    if (options.generateThumbnails) {
      await generateThumbnails(bucket, path, processedFile);
    }

    return {
      success: true,
      url: publicUrlData.publicUrl,
      path: data.path,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Processa imagem aplicando transformações
 */
async function processImage(
  file: File,
  options: TransformOptions
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    if (!ctx) {
      reject(new Error('Não foi possível criar contexto do canvas'));
      return;
    }

    img.onload = () => {
      // Calcular dimensões finais
      const { width, height } = resizeWithAspectRatio(
        img.width,
        img.height,
        options.width,
        options.height
      );

      canvas.width = width;
      canvas.height = height;

      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Converter para blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Erro ao processar imagem'));
            return;
          }

          const processedFile = new File([blob], file.name, {
            type: `image/${options.format || 'webp'}`,
            lastModified: Date.now(),
          });

          resolve(processedFile);
        },
        `image/${options.format || 'webp'}`,
        (options.quality || 80) / 100
      );
    };

    img.onerror = () => reject(new Error('Erro ao carregar imagem'));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Gera thumbnails em diferentes tamanhos
 */
async function generateThumbnails(
  bucket: string,
  originalPath: string,
  file: File
): Promise<void> {
  const thumbnailSizes = [
    { suffix: '_thumb', width: 150, height: 150 },
    { suffix: '_small', width: 300, height: 300 },
    { suffix: '_medium', width: 600, height: 600 },
  ];

  for (const size of thumbnailSizes) {
    try {
      const processedFile = await processImage(file, {
        width: size.width,
        height: size.height,
        quality: 70,
        format: 'webp',
      });

      const thumbnailPath = originalPath.replace(
        /(\.[^.]+)$/,
        `${size.suffix}$1`
      );

      await supabase.storage.from(bucket).upload(thumbnailPath, processedFile, {
        cacheControl: '31536000',
        upsert: true,
      });
    } catch (error) {
      console.error(`Erro ao gerar thumbnail ${size.suffix}:`, error);
    }
  }
}

/**
 * Gera URL transformada do Supabase
 */
export function getTransformedImageUrl(
  bucket: string,
  path: string,
  options: TransformOptions = {}
): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  let url = data.publicUrl;

  // Aplicar transformações via query params (se suportado)
  const params = new URLSearchParams();

  if (options.width) params.append('width', options.width.toString());
  if (options.height) params.append('height', options.height.toString());
  if (options.quality) params.append('quality', options.quality.toString());
  if (options.format) params.append('format', options.format);
  if (options.resize) params.append('resize', options.resize);

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  return url;
}

/**
 * Gera URL otimizada baseada no tamanho predefinido
 */
export function getOptimizedImageUrl(
  bucket: string,
  path: string,
  size: ImageSize,
  quality: ImageQuality = 'card'
): string {
  const dimensions = IMAGE_CONFIG.sizes[size];
  const optimalQuality = IMAGE_CONFIG.quality[quality];

  return getTransformedImageUrl(bucket, path, {
    width: dimensions.width,
    height: dimensions.height,
    quality: optimalQuality,
    format: 'webp',
    resize: 'cover',
  });
}

/**
 * Lista imagens de um bucket
 */
export async function listImages(
  bucket: string,
  folder: string = '',
  limit: number = 100
): Promise<{
  success: boolean;
  images?: Array<{
    name: string;
    url: string;
    size: number;
    lastModified: string;
  }>;
  error?: string;
}> {
  try {
    const { data, error } = await supabase.storage.from(bucket).list(folder, {
      limit,
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const images = data
      .filter((file) => file.name.match(/\.(jpg|jpeg|png|webp|avif)$/i))
      .map((file) => {
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(`${folder}/${file.name}`);

        return {
          name: file.name,
          url: urlData.publicUrl,
          size: file.metadata?.size || 0,
          lastModified: file.created_at || '',
        };
      });

    return { success: true, images };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Deleta imagem do Supabase Storage
 */
export async function deleteImage(
  bucket: string,
  path: string,
  deleteThumbnails: boolean = true
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    // Deletar imagem principal
    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (deleteError) {
      return { success: false, error: deleteError.message };
    }

    // Deletar thumbnails se solicitado
    if (deleteThumbnails) {
      const thumbnailPaths = [
        path.replace(/(\.[^.]+)$/, '_thumb$1'),
        path.replace(/(\.[^.]+)$/, '_small$1'),
        path.replace(/(\.[^.]+)$/, '_medium$1'),
      ];

      await supabase.storage.from(bucket).remove(thumbnailPaths);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}

/**
 * Gera URL de placeholder para imagem não encontrada
 */
export function getPlaceholderUrl(
  width: number,
  height: number,
  text: string = 'Imagem não encontrada'
): string {
  // Gera uma URL de placeholder usando um serviço externo ou SVG
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${IMAGE_CONFIG.placeholder.backgroundColor}"/>
      <text x="50%" y="50%" text-anchor="middle" dy="0.35em" font-family="Arial, sans-serif" font-size="14" fill="#666">
        ${text}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
