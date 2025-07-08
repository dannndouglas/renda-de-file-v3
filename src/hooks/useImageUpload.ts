/**
 * Hook para upload e otimização de imagens
 * Gerencia upload para Supabase com otimização automática
 */

'use client';

import { useState, useCallback } from 'react';
import { uploadImage, isValidImageFile, formatFileSize } from '@/lib/images';

interface UploadProgress {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  url?: string;
  error?: string;
}

interface UseImageUploadOptions {
  bucket: string;
  folder?: string;
  maxFileSize?: number; // em bytes
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  generateThumbnails?: boolean;
  allowedTypes?: string[];
  onUploadComplete?: (url: string, file: File) => void;
  onUploadError?: (error: string, file: File) => void;
  onUploadProgress?: (progress: number, file: File) => void;
}

export function useImageUpload(options: UseImageUploadOptions) {
  const [uploads, setUploads] = useState<Map<string, UploadProgress>>(
    new Map()
  );
  const [isUploading, setIsUploading] = useState(false);

  const {
    bucket,
    folder = '',
    maxFileSize = 5 * 1024 * 1024, // 5MB
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 80,
    generateThumbnails = true,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    onUploadComplete,
    onUploadError,
    onUploadProgress,
  } = options;

  const validateFile = useCallback(
    (file: File): string | null => {
      // Verificar tipo de arquivo
      if (!allowedTypes.includes(file.type)) {
        return `Tipo de arquivo não suportado. Tipos permitidos: ${allowedTypes.join(', ')}`;
      }

      // Verificar tamanho
      if (file.size > maxFileSize) {
        return `Arquivo muito grande. Tamanho máximo: ${formatFileSize(maxFileSize)}`;
      }

      // Verificar se é uma imagem válida
      if (!isValidImageFile(file)) {
        return 'Arquivo de imagem inválido';
      }

      return null;
    },
    [allowedTypes, maxFileSize]
  );

  const generateFileName = useCallback(
    (file: File): string => {
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';

      return `${folder}/${timestamp}_${random}.${extension}`.replace(/^\//, '');
    },
    [folder]
  );

  const uploadSingleFile = useCallback(
    async (file: File): Promise<string | null> => {
      const fileId = `${file.name}-${file.size}-${file.lastModified}`;

      // Validar arquivo
      const validationError = validateFile(file);
      if (validationError) {
        setUploads((prev) =>
          new Map(prev).set(fileId, {
            file,
            progress: 0,
            status: 'error',
            error: validationError,
          })
        );
        onUploadError?.(validationError, file);
        return null;
      }

      // Inicializar upload
      setUploads((prev) =>
        new Map(prev).set(fileId, {
          file,
          progress: 0,
          status: 'pending',
        })
      );

      try {
        // Atualizar status para uploading
        setUploads((prev) =>
          new Map(prev).set(fileId, {
            file,
            progress: 10,
            status: 'uploading',
          })
        );

        onUploadProgress?.(10, file);

        // Gerar nome do arquivo
        const fileName = generateFileName(file);

        // Processar imagem
        setUploads((prev) =>
          new Map(prev).set(fileId, {
            file,
            progress: 30,
            status: 'processing',
          })
        );

        onUploadProgress?.(30, file);

        // Upload para Supabase
        const result = await uploadImage({
          bucket,
          path: fileName,
          file,
          maxWidth,
          maxHeight,
          quality,
          generateThumbnails,
        });

        if (!result.success) {
          throw new Error(result.error || 'Erro no upload');
        }

        // Sucesso
        setUploads((prev) =>
          new Map(prev).set(fileId, {
            file,
            progress: 100,
            status: 'completed',
            url: result.url,
          })
        );

        onUploadComplete?.(result.url!, file);
        onUploadProgress?.(100, file);

        return result.url!;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Erro desconhecido';

        setUploads((prev) =>
          new Map(prev).set(fileId, {
            file,
            progress: 0,
            status: 'error',
            error: errorMessage,
          })
        );

        onUploadError?.(errorMessage, file);
        return null;
      }
    },
    [
      bucket,
      validateFile,
      generateFileName,
      maxWidth,
      maxHeight,
      quality,
      generateThumbnails,
      onUploadComplete,
      onUploadError,
      onUploadProgress,
    ]
  );

  const uploadFiles = useCallback(
    async (files: File[]): Promise<(string | null)[]> => {
      setIsUploading(true);

      try {
        const uploadPromises = files.map((file) => uploadSingleFile(file));
        const results = await Promise.all(uploadPromises);

        return results;
      } finally {
        setIsUploading(false);
      }
    },
    [uploadSingleFile]
  );

  const uploadFile = useCallback(
    async (file: File): Promise<string | null> => {
      const results = await uploadFiles([file]);
      return results[0];
    },
    [uploadFiles]
  );

  const removeUpload = useCallback((fileId: string) => {
    setUploads((prev) => {
      const newUploads = new Map(prev);
      newUploads.delete(fileId);
      return newUploads;
    });
  }, []);

  const clearUploads = useCallback(() => {
    setUploads(new Map());
  }, []);

  const getUploadProgress = useCallback(
    (file: File): UploadProgress | null => {
      const fileId = `${file.name}-${file.size}-${file.lastModified}`;
      return uploads.get(fileId) || null;
    },
    [uploads]
  );

  const getCompletedUploads = useCallback((): UploadProgress[] => {
    return Array.from(uploads.values()).filter(
      (upload) => upload.status === 'completed'
    );
  }, [uploads]);

  const getFailedUploads = useCallback((): UploadProgress[] => {
    return Array.from(uploads.values()).filter(
      (upload) => upload.status === 'error'
    );
  }, [uploads]);

  const retryUpload = useCallback(
    async (file: File): Promise<string | null> => {
      const fileId = `${file.name}-${file.size}-${file.lastModified}`;

      // Remover upload anterior
      setUploads((prev) => {
        const newUploads = new Map(prev);
        newUploads.delete(fileId);
        return newUploads;
      });

      // Tentar novamente
      return uploadFile(file);
    },
    [uploadFile]
  );

  return {
    // Estados
    uploads: Array.from(uploads.values()),
    isUploading,

    // Ações
    uploadFile,
    uploadFiles,
    removeUpload,
    clearUploads,
    retryUpload,

    // Utilitários
    getUploadProgress,
    getCompletedUploads,
    getFailedUploads,
    validateFile,

    // Estatísticas
    totalUploads: uploads.size,
    completedUploads: getCompletedUploads().length,
    failedUploads: getFailedUploads().length,
  };
}
