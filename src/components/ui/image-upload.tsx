/**
 * Componente para upload de imagens
 * Drag & drop com preview e progresso
 */

'use client';

import { useState, useRef, useCallback, DragEvent } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { OptimizedImage } from './optimized-image';
import { Button } from './button';
import { Progress } from './progress';
import { Badge } from './badge';
import { formatFileSize } from '@/lib/images';
import { Upload, X, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  bucket: string;
  folder?: string;
  maxFiles?: number;
  maxFileSize?: number;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  generateThumbnails?: boolean;
  allowedTypes?: string[];
  showPreview?: boolean;
  className?: string;
  onUploadComplete?: (urls: string[]) => void;
  onUploadError?: (error: string) => void;
  onFilesChange?: (files: File[]) => void;
}

export function ImageUpload({
  bucket,
  folder = 'uploads',
  maxFiles = 5,
  maxFileSize = 5 * 1024 * 1024, // 5MB
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 80,
  generateThumbnails = true,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  showPreview = true,
  className,
  onUploadComplete,
  onUploadError,
  onFilesChange,
}: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploads,
    isUploading,
    uploadFiles,
    removeUpload,
    clearUploads,
    retryUpload,
    validateFile,
    completedUploads,
    failedUploads,
  } = useImageUpload({
    bucket,
    folder,
    maxFileSize,
    maxWidth,
    maxHeight,
    quality,
    generateThumbnails,
    allowedTypes,
    onUploadComplete: (url, file) => {
      // Verificar se todos os uploads foram concluídos
      const allCompleted = selectedFiles.every(
        (f) =>
          uploads.find((u) => u.file.name === f.name)?.status === 'completed'
      );

      if (allCompleted) {
        const completedUrls = uploads
          .filter((u) => u.status === 'completed')
          .map((u) => u.url!)
          .filter(Boolean);

        onUploadComplete?.(completedUrls);
      }
    },
    onUploadError: (error) => {
      onUploadError?.(error);
    },
  });

  const handleFileSelect = useCallback(
    (files: File[]) => {
      // Limitar número de arquivos
      const filesToProcess = files.slice(0, maxFiles);

      // Validar arquivos
      const validFiles = filesToProcess.filter((file) => {
        const error = validateFile(file);
        if (error) {
          onUploadError?.(error);
          return false;
        }
        return true;
      });

      setSelectedFiles(validFiles);
      onFilesChange?.(validFiles);
    },
    [maxFiles, validateFile, onUploadError, onFilesChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      handleFileSelect(files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      handleFileSelect(files);
    },
    [handleFileSelect]
  );

  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return;

    await uploadFiles(selectedFiles);
  }, [selectedFiles, uploadFiles]);

  const handleRemoveFile = useCallback(
    (file: File) => {
      setSelectedFiles((prev) => prev.filter((f) => f !== file));
      const fileId = `${file.name}-${file.size}-${file.lastModified}`;
      removeUpload(fileId);
    },
    [removeUpload]
  );

  const handleClearAll = useCallback(() => {
    setSelectedFiles([]);
    clearUploads();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [clearUploads]);

  const handleRetry = useCallback(
    (file: File) => {
      retryUpload(file);
    },
    [retryUpload]
  );

  const getFileStatus = useCallback(
    (file: File) => {
      return uploads.find((u) => u.file.name === file.name);
    },
    [uploads]
  );

  return (
    <div className={cn('space-y-4', className)}>
      {/* Área de upload */}
      <div
        className={cn(
          'rounded-lg border-2 border-dashed p-8 text-center transition-colors',
          dragOver
            ? 'border-renda-500 bg-renda-50'
            : 'border-gray-300 hover:border-renda-400',
          isUploading && 'pointer-events-none opacity-50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
        <p className="mb-2 text-lg font-medium text-gray-900">
          Arraste imagens aqui ou clique para selecionar
        </p>
        <p className="mb-4 text-sm text-gray-500">
          Suporte para {allowedTypes.join(', ')} • Máximo{' '}
          {formatFileSize(maxFileSize)} por arquivo
        </p>

        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          Selecionar Imagens
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          multiple
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {/* Lista de arquivos selecionados */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">
              Arquivos Selecionados ({selectedFiles.length})
            </h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                disabled={isUploading}
              >
                Limpar Tudo
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading || selectedFiles.length === 0}
              >
                {isUploading ? 'Enviando...' : 'Enviar Imagens'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {selectedFiles.map((file, index) => {
              const fileStatus = getFileStatus(file);
              const progress = fileStatus?.progress || 0;
              const status = fileStatus?.status || 'pending';
              const error = fileStatus?.error;

              return (
                <div key={index} className="space-y-3 rounded-lg border p-4">
                  {/* Preview e informações */}
                  <div className="flex items-start space-x-3">
                    {showPreview && (
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {URL.createObjectURL && (
                          <OptimizedImage
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            size="thumbnail"
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>

                      {/* Status badge */}
                      <Badge
                        variant={
                          status === 'completed'
                            ? 'default'
                            : status === 'error'
                              ? 'destructive'
                              : 'secondary'
                        }
                        className="mt-1"
                      >
                        {status === 'pending' && 'Pendente'}
                        {status === 'uploading' && 'Enviando'}
                        {status === 'processing' && 'Processando'}
                        {status === 'completed' && (
                          <>
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Concluído
                          </>
                        )}
                        {status === 'error' && (
                          <>
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Erro
                          </>
                        )}
                      </Badge>
                    </div>

                    {/* Ações */}
                    <div className="flex items-center space-x-1">
                      {status === 'error' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRetry(file)}
                          disabled={isUploading}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(file)}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Barra de progresso */}
                  {(status === 'uploading' || status === 'processing') && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {status === 'uploading'
                            ? 'Enviando...'
                            : 'Processando...'}
                        </span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {/* Mensagem de erro */}
                  {error && (
                    <div className="rounded bg-red-50 p-2 text-xs text-red-600">
                      {error}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resumo */}
      {uploads.length > 0 && (
        <div className="flex items-center justify-between border-t pt-4 text-sm text-gray-500">
          <span>
            {completedUploads} de {uploads.length} imagens enviadas
          </span>
          {failedUploads > 0 && (
            <span className="text-red-600">{failedUploads} falharam</span>
          )}
        </div>
      )}
    </div>
  );
}
