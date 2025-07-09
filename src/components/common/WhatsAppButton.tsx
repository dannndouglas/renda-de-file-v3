'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  phoneNumber,
  message = '',
  size = 'default',
  variant = 'default',
  className,
  onClick,
  children
}: WhatsAppButtonProps) {
  const formattedNumber = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/55${formattedNumber}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={cn('gap-2', className)}
      onClick={handleClick}
    >
      <MessageCircle className="h-5 w-5" />
      {children || 'Contatar via WhatsApp'}
    </Button>
  );
}