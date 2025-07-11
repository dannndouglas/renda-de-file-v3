import { useState, useCallback } from 'react';

interface ToastProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((props: ToastProps) => {
    // Simples implementação de toast
    // Em produção, você poderia usar uma biblioteca como react-hot-toast ou sonner
    if (props.variant === 'destructive') {
      console.error(`${props.title}: ${props.description || ''}`);
    } else {
      console.log(`${props.title}: ${props.description || ''}`);
    }
    
    // Adicionar toast à lista
    setToasts(prev => [...prev, props]);
    
    // Remover toast após 3 segundos
    setTimeout(() => {
      setToasts(prev => prev.slice(1));
    }, 3000);
  }, []);

  return { toast, toasts };
}