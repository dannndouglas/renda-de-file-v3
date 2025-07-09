'use client';

import { WifiOff, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-gray-100 p-3">
              <WifiOff className="h-8 w-8 text-gray-600" />
            </div>
          </div>

          <h1 className="mb-4 text-2xl font-bold text-gray-900">Sem conexão</h1>

          <p className="mb-6 text-gray-600">
            Você está offline. Verifique sua conexão com a internet e tente
            novamente.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => window.location.reload()}
              className="w-full"
              variant="outline"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Tentar novamente
            </Button>

            <Button asChild className="w-full">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Voltar ao início
              </Link>
            </Button>
          </div>

          <div className="mt-6 rounded-lg bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Dica:</strong> Algumas páginas que você visitou
              recentemente podem estar disponíveis offline. Tente navegar pelo
              menu principal.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
