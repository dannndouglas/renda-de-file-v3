'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell, BellOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from 'sonner';

interface NotificationManagerProps {
  className?: string;
}

export function NotificationManager({ className }: NotificationManagerProps) {
  const {
    permission,
    isSupported,
    isSubscribed,
    isLoading,
    requestPermission,
    subscribe,
    unsubscribe,
    showNotification,
  } = useNotifications();

  const [testLoading, setTestLoading] = useState(false);

  const handleToggleNotifications = async () => {
    if (!isSupported) {
      toast.error('Notificações não são suportadas neste navegador');
      return;
    }

    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) {
        toast.error('Permissão para notificações negada');
        return;
      }
    }

    if (isSubscribed) {
      const success = await unsubscribe();
      if (success) {
        toast.success('Notificações desativadas');
      } else {
        toast.error('Erro ao desativar notificações');
      }
    } else {
      const success = await subscribe();
      if (success) {
        toast.success('Notificações ativadas!');
      } else {
        toast.error('Erro ao ativar notificações');
      }
    }
  };

  const handleTestNotification = async () => {
    if (permission !== 'granted' || !isSubscribed) {
      toast.error('Ative as notificações primeiro');
      return;
    }

    setTestLoading(true);
    try {
      await showNotification(
        'Teste de Notificação',
        'As notificações estão funcionando perfeitamente! 🎉'
      );
      toast.success('Notificação de teste enviada');
    } catch (error) {
      toast.error('Erro ao enviar notificação de teste');
    } finally {
      setTestLoading(false);
    }
  };

  if (!isSupported) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="w-5 h-5 text-gray-400" />
            Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              Seu navegador não suporta notificações push
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-600" />
          Notificações Push
        </CardTitle>
        <p className="text-sm text-gray-600">
          Receba notificações sobre novos produtos, eventos e notícias
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status das Permissões */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <div className="flex items-center gap-2">
              {permission === 'granted' ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">Permitido</span>
                </>
              ) : permission === 'denied' ? (
                <>
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600">Negado</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-600">Não solicitado</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Notificações:</span>
            <div className="flex items-center gap-2">
              <Switch
                checked={isSubscribed}
                onCheckedChange={handleToggleNotifications}
                disabled={isLoading || permission === 'denied'}
              />
              <span className="text-sm">
                {isSubscribed ? 'Ativadas' : 'Desativadas'}
              </span>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="space-y-2">
          {permission !== 'granted' && (
            <Button
              onClick={requestPermission}
              disabled={isLoading}
              className="w-full"
              variant="outline"
            >
              {isLoading ? 'Solicitando...' : 'Permitir Notificações'}
            </Button>
          )}

          {permission === 'granted' && isSubscribed && (
            <Button
              onClick={handleTestNotification}
              disabled={testLoading}
              className="w-full"
              variant="outline"
            >
              {testLoading ? 'Enviando...' : 'Testar Notificação'}
            </Button>
          )}
        </div>

        {/* Informações */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Novos produtos adicionados ao catálogo</p>
          <p>• Eventos e workshops disponíveis</p>
          <p>• Notícias sobre a tradição da Renda de Filé</p>
          <p>• Você pode desativar a qualquer momento</p>
        </div>

        {permission === 'denied' && (
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <p className="text-sm text-red-700">
              Para receber notificações, você precisa permitir nas configurações do seu navegador.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}