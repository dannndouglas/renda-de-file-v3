'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { urlForImage } from '@/lib/images/sanity';
import { useKeyboardNavigation } from './useKeyboardNavigation';
import { createPortal } from 'react-dom';

interface FullscreenModalProps {
  images: Array<{
    asset: {
      url: string;
    };
    alt?: string;
  }>;
  selectedIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function FullscreenModal({
  images,
  selectedIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: FullscreenModalProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [pinchDistance, setPinchDistance] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const MIN_ZOOM = 1;
  const MAX_ZOOM = 2; // Reduzido para 200%
  const ZOOM_STEP = 0.25;

  // Navegação por teclado
  useKeyboardNavigation({
    onNext,
    onPrevious,
    onClose,
    enabled: isOpen,
  });

  // Bloquear scroll quando modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      // Reset zoom quando fechar
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Funções de zoom
  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
      if (newZoom === MIN_ZOOM) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Clique esquerdo - ampliar
    if (e.button === 0) {
      if (zoomLevel < MAX_ZOOM) {
        handleZoomIn();
      }
    }
  }, [zoomLevel, handleZoomIn]);
  
  const handleRightClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Clique direito - reduzir
    if (zoomLevel > MIN_ZOOM) {
      handleZoomOut();
    }
  }, [zoomLevel, handleZoomOut]);

  // Funções de drag
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoomLevel > MIN_ZOOM) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [zoomLevel, position]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && zoomLevel > MIN_ZOOM) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Calcular limites de movimento baseado no zoom e tamanho da imagem
      // Permitir navegar até as bordas da imagem ampliada
      const rect = imageRef.current?.getBoundingClientRect();
      if (rect) {
        const scaledWidth = rect.width * zoomLevel;
        const scaledHeight = rect.height * zoomLevel;
        const maxX = Math.max(0, (scaledWidth - rect.width) / 2);
        const maxY = Math.max(0, (scaledHeight - rect.height) / 2);
        
        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY))
        });
      }
    }
  }, [isDragging, dragStart, zoomLevel]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom com scroll
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }, [handleZoomIn, handleZoomOut]);

  // Gestos de toque
  const getDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const touch1 = touches[0];
    const touch2 = touches[1];
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      const distance = getDistance(e.touches);
      setPinchDistance(distance);
    } else if (e.touches.length === 1) {
      // Swipe ou drag
      setTouchEnd(null);
      setTouchStart(e.touches[0].clientX);
      
      if (zoomLevel > MIN_ZOOM) {
        setIsDragging(true);
        setDragStart({ 
          x: e.touches[0].clientX - position.x, 
          y: e.touches[0].clientY - position.y 
        });
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchDistance !== null) {
      // Pinch zoom
      const newDistance = getDistance(e.touches);
      if (newDistance) {
        const scale = newDistance / pinchDistance;
        const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoomLevel * scale));
        setZoomLevel(newZoom);
        if (newZoom === MIN_ZOOM) {
          setPosition({ x: 0, y: 0 });
        }
        setPinchDistance(newDistance);
      }
    } else if (e.touches.length === 1) {
      // Drag quando com zoom
      if (isDragging && zoomLevel > MIN_ZOOM) {
        const touch = e.touches[0];
        const newX = touch.clientX - dragStart.x;
        const newY = touch.clientY - dragStart.y;
        
        const rect = imageRef.current?.getBoundingClientRect();
        if (rect) {
          const scaledWidth = rect.width * zoomLevel;
          const scaledHeight = rect.height * zoomLevel;
          const maxX = Math.max(0, (scaledWidth - rect.width) / 2);
          const maxY = Math.max(0, (scaledHeight - rect.height) / 2);
          
          setPosition({
            x: Math.max(-maxX, Math.min(maxX, newX)),
            y: Math.max(-maxY, Math.min(maxY, newY))
          });
        }
      } else {
        // Swipe quando sem zoom
        setTouchEnd(e.touches[0].clientX);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setPinchDistance(null);
    setIsDragging(false);
    
    // Swipe navigation apenas quando sem zoom
    if (zoomLevel === MIN_ZOOM && touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > 50;
      const isRightSwipe = distance < -50;

      if (isLeftSwipe && images.length > 1) {
        onNext();
      }
      if (isRightSwipe && images.length > 1) {
        onPrevious();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!isOpen) return null;

  const currentImage = images[selectedIndex];

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl"
          onClick={onClose}
        >
          {/* Controles superiores */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-4">
            <div className="flex items-center gap-4 text-white">
              <span className="text-sm font-medium">
                {selectedIndex + 1} / {images.length}
              </span>
              {zoomLevel > MIN_ZOOM && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm backdrop-blur-sm">
                  {Math.round(zoomLevel * 100)}%
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                disabled={zoomLevel <= MIN_ZOOM}
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                disabled={zoomLevel >= MAX_ZOOM}
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Imagem principal */}
          <div
            className="relative flex h-full w-full items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              ref={imageRef}
              key={selectedIndex}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                scale: zoomLevel,
                x: position.x,
                y: position.y
              }}
              transition={{ 
                opacity: { duration: 0.2 },
                scale: { duration: 0.3, ease: "easeOut" },
                x: { duration: isDragging ? 0 : 0.3 },
                y: { duration: isDragging ? 0 : 0.3 }
              }}
              className={cn(
                'relative h-full w-full',
                zoomLevel > MIN_ZOOM && !isDragging && 'cursor-grab',
                isDragging && 'cursor-grabbing',
                zoomLevel === MIN_ZOOM && 'cursor-zoom-in'
              )}
              onClick={handleClick}
              onContextMenu={handleRightClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <Image
                src={
                  urlForImage(currentImage, {
                    width: 1920,
                    height: 1920,
                    quality: 95,
                  }) || currentImage.asset.url
                }
                alt={currentImage.alt || 'Imagem em tela cheia'}
                fill
                className="object-contain select-none"
                sizes="100vw"
                priority
                draggable={false}
              />
            </motion.div>

            {/* Navegação lateral */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrevious();
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Miniaturas inferiores */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur p-4">
              <div className="mx-auto flex max-w-4xl justify-center gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Reset zoom ao trocar de imagem
                      setZoomLevel(MIN_ZOOM);
                      setPosition({ x: 0, y: 0 });
                      // Navegar diretamente para o índice
                      const diff = index - selectedIndex;
                      if (diff > 0) {
                        for (let i = 0; i < diff; i++) onNext();
                      } else if (diff < 0) {
                        for (let i = 0; i < Math.abs(diff); i++) onPrevious();
                      }
                    }}
                    className={cn(
                      'relative h-16 w-16 overflow-hidden rounded-md border-2 transition-all',
                      selectedIndex === index
                        ? 'border-white'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={
                        urlForImage(image, {
                          width: 100,
                          height: 100,
                          quality: 70,
                        }) || image.asset.url
                      }
                      alt={image.alt || `Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Renderizar no portal para garantir que apareça acima de tudo
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return null;
}