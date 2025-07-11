'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle } from 'lucide-react';
import type { Associacao } from '@/lib/sanity/types';

interface WhatsAppContactButtonProps {
  associacao: Associacao;
}

export function WhatsAppContactButton({
  associacao,
}: WhatsAppContactButtonProps) {
  const handleWhatsAppClick = () => {
    const numero = associacao.whatsapp?.replace(/\D/g, '');
    const mensagem = `Olá! Vi a associação "${associacao.nome}" no site da Renda de Filé.

🏪 Associação: ${associacao.nome}
📍 Localização: ${associacao.endereco?.cidade || 'N/A'}/${associacao.endereco?.estado || 'N/A'}

Gostaria de saber mais informações sobre os produtos e serviços oferecidos.`;

    const url = `https://wa.me/55${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!associacao.whatsapp) {
    return null;
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="p-4">
        <div className="text-center">
          <div className="mb-3">
            <MessageCircle className="mx-auto h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 font-semibold text-green-800">
            Entre em Contato
          </h3>
          <p className="mb-4 text-sm text-green-700">
            Converse diretamente com a associação pelo WhatsApp
          </p>
          <Button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-600 text-white hover:bg-green-700"
            size="lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chamar no WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
