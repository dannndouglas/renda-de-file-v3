'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Phone, Clock } from 'lucide-react';
import type { Associacao } from '@/lib/sanity/types';

interface WhatsAppContactButtonProps {
  associacao: Associacao;
}

export function WhatsAppContactButton({
  associacao,
}: WhatsAppContactButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleWhatsAppClick = () => {
    setIsClicked(true);
    
    const numero = associacao.whatsapp?.replace(/\D/g, '');
    const mensagem = `Olá! Vi a associação "${associacao.nome}" no site da Renda de Filé.

🏪 Associação: ${associacao.nome}
📍 Localização: ${associacao.endereco?.cidade || 'N/A'}/${associacao.endereco?.estado || 'N/A'}

Gostaria de saber mais informações sobre os produtos e serviços oferecidos.`;

    const url = `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Reset click state after animation
    setTimeout(() => setIsClicked(false), 1000);
  };

  if (!associacao.whatsapp) {
    return null;
  }

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 shadow-sm transition-shadow hover:shadow-md">
      {/* Decorative elements */}
      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-green-200/30" />
      <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-full bg-emerald-200/20" />
      
      <CardContent className="relative p-6">
        <div className="text-center">
          {/* Animated icon */}
          <div className="mb-4 flex justify-center">
            <div className={`rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-4 transition-transform duration-300 ${isClicked ? 'scale-110' : 'hover:scale-105'}`}>
              <MessageCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          
          {/* Content */}
          <h3 className="mb-2 text-lg font-bold text-green-800">
            Fale Conosco
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-green-700">
            Converse diretamente com nossa associação pelo WhatsApp. Resposta rápida garantida!
          </p>
          
          {/* Contact details */}
          <div className="mb-4 flex items-center justify-center gap-4 text-xs text-green-600">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{associacao.whatsapp}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Online agora</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button
            onClick={handleWhatsAppClick}
            className={`group w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl ${isClicked ? 'scale-95' : 'hover:scale-[1.02]'}`}
            size="lg"
            aria-label={`Entrar em contato com ${associacao.nome} pelo WhatsApp`}
            disabled={isClicked}
          >
            <MessageCircle className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" aria-hidden="true" />
            {isClicked ? 'Abrindo WhatsApp...' : 'Chamar no WhatsApp'}
          </Button>
          
          {/* Trust indicator */}
          <p className="mt-3 text-xs text-green-600/80">
            ✓ Resposta em até 30 minutos
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
