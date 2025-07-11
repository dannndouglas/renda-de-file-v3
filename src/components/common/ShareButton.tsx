'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Check, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, text, url, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const { toast } = useToast();
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  const handleShare = async () => {
    try {
      if (canShare && navigator.share) {
        await navigator.share({
          title,
          text: text || title,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast({
          title: 'Link copiado!',
          description: 'O link foi copiado para a área de transferência.',
        });
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: 'Erro ao compartilhar',
          description: 'Não foi possível compartilhar o produto.',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={handleShare}
      className={className}
    >
      {copied ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : canShare ? (
        <Share2 className="h-5 w-5" />
      ) : (
        <Copy className="h-5 w-5" />
      )}
    </Button>
  );
}