'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink } from 'lucide-react';

interface AssociacaoMapsProps {
  endereco: string;
  nomeAssociacao: string;
}

export function AssociacaoMaps({
  endereco,
  nomeAssociacao,
}: AssociacaoMapsProps) {
  const handleOpenMaps = () => {
    const query = encodeURIComponent(`${endereco}, ${nomeAssociacao}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // URL para embed do Google Maps
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(endereco)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5" />
          Localização
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{endereco}</p>

          {/* Mapa incorporado ou placeholder */}
          {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Localização da ${nomeAssociacao}`}
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Mapa não disponível
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleOpenMaps}
            variant="outline"
            className="w-full"
            size="sm"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Abrir no Google Maps
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
