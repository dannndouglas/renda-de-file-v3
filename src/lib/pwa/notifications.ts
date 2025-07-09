'use client';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  data?: any;
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

class NotificationManager {
  private static instance: NotificationManager;
  private registration: ServiceWorkerRegistration | null = null;

  private constructor() {}

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }
    return NotificationManager.instance;
  }

  // Verificar se notificações são suportadas
  isSupported(): boolean {
    return 'Notification' in window && 'serviceWorker' in navigator;
  }

  // Verificar permissão atual
  getPermission(): NotificationPermission {
    return Notification.permission;
  }

  // Solicitar permissão
  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) {
      throw new Error('Notificações não são suportadas neste navegador');
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  // Configurar service worker
  async setupServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registrado com sucesso');
      } catch (error) {
        console.error('Erro ao registrar Service Worker:', error);
      }
    }
  }

  // Enviar notificação local
  async showNotification(options: NotificationOptions): Promise<void> {
    const permission = this.getPermission();

    if (permission !== 'granted') {
      throw new Error('Permissão para notificações não concedida');
    }

    const notificationOptions: NotificationOptions = {
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      ...options,
    };

    if (this.registration) {
      // Usar service worker para notificação
      await this.registration.showNotification(
        options.title,
        notificationOptions
      );
    } else {
      // Fallback para notificação simples
      new Notification(options.title, notificationOptions);
    }
  }

  // Subscrever para push notifications
  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration) {
      await this.setupServiceWorker();
    }

    if (!this.registration) {
      throw new Error('Service Worker não está disponível');
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlB64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || ''
        ),
      });

      // Enviar subscription para o servidor
      await this.saveSubscription(subscription);
      return subscription;
    } catch (error) {
      console.error('Erro ao subscrever para push notifications:', error);
      return null;
    }
  }

  // Cancelar subscription
  async unsubscribeFromPush(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const subscription =
        await this.registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        await this.removeSubscription(subscription);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao cancelar push notifications:', error);
      return false;
    }
  }

  // Verificar se está subscrito
  async isSubscribed(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const subscription =
        await this.registration.pushManager.getSubscription();
      return !!subscription;
    } catch (error) {
      return false;
    }
  }

  // Salvar subscription no servidor
  private async saveSubscription(
    subscription: PushSubscription
  ): Promise<void> {
    try {
      await fetch('/api/v1/push-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
    } catch (error) {
      console.error('Erro ao salvar subscription:', error);
    }
  }

  // Remover subscription do servidor
  private async removeSubscription(
    subscription: PushSubscription
  ): Promise<void> {
    try {
      await fetch('/api/v1/push-subscription', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
    } catch (error) {
      console.error('Erro ao remover subscription:', error);
    }
  }

  // Converter VAPID key
  private urlB64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Notificações pré-definidas
  async notifyNewProduct(product: {
    nome: string;
    preco?: number;
  }): Promise<void> {
    await this.showNotification({
      title: 'Novo Produto Disponível!',
      body: `${product.nome} ${product.preco ? `por R$ ${product.preco.toFixed(2)}` : ''}`,
      tag: 'new-product',
      data: { type: 'new-product', product },
      actions: [
        {
          action: 'view',
          title: 'Ver Produto',
        },
        {
          action: 'dismiss',
          title: 'Dispensar',
        },
      ],
    });
  }

  async notifyEvent(event: {
    titulo: string;
    dataInicio: string;
  }): Promise<void> {
    await this.showNotification({
      title: 'Novo Evento!',
      body: `${event.titulo} - ${new Date(event.dataInicio).toLocaleDateString()}`,
      tag: 'new-event',
      data: { type: 'new-event', event },
      actions: [
        {
          action: 'view',
          title: 'Ver Evento',
        },
        {
          action: 'dismiss',
          title: 'Dispensar',
        },
      ],
    });
  }

  async notifyNews(news: { titulo: string; resumo: string }): Promise<void> {
    await this.showNotification({
      title: 'Nova Notícia!',
      body: news.resumo,
      tag: 'new-news',
      data: { type: 'new-news', news },
      actions: [
        {
          action: 'view',
          title: 'Ler Mais',
        },
        {
          action: 'dismiss',
          title: 'Dispensar',
        },
      ],
    });
  }
}

export default NotificationManager;
