'use client';

import { useState, useEffect, useCallback } from 'react';
import NotificationManager from '@/lib/pwa/notifications';

interface UseNotificationsReturn {
  permission: NotificationPermission | null;
  isSupported: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  requestPermission: () => Promise<boolean>;
  subscribe: () => Promise<boolean>;
  unsubscribe: () => Promise<boolean>;
  showNotification: (title: string, body: string) => Promise<void>;
}

export function useNotifications(): UseNotificationsReturn {
  const [permission, setPermission] = useState<NotificationPermission | null>(
    null
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const notificationManager = NotificationManager.getInstance();
  const isSupported = notificationManager.isSupported();

  const checkSubscriptionStatus = useCallback(async () => {
    try {
      const subscribed = await notificationManager.isSubscribed();
      setIsSubscribed(subscribed);
    } catch (error) {
      console.error('Erro ao verificar status da inscrição:', error);
    }
  }, [notificationManager]);

  useEffect(() => {
    if (isSupported) {
      setPermission(notificationManager.getPermission());
      checkSubscriptionStatus();
    }
  }, [isSupported, notificationManager, checkSubscriptionStatus]);

  const requestPermission = async (): Promise<boolean> => {
    if (!isSupported) return false;

    setIsLoading(true);
    try {
      const newPermission = await notificationManager.requestPermission();
      setPermission(newPermission);
      return newPermission === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const subscribe = async (): Promise<boolean> => {
    if (!isSupported || permission !== 'granted') return false;

    setIsLoading(true);
    try {
      const subscription = await notificationManager.subscribeToPush();
      const success = !!subscription;
      setIsSubscribed(success);
      return success;
    } catch (error) {
      console.error('Erro ao subscrever:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async (): Promise<boolean> => {
    if (!isSupported) return false;

    setIsLoading(true);
    try {
      const success = await notificationManager.unsubscribeFromPush();
      setIsSubscribed(!success);
      return success;
    } catch (error) {
      console.error('Erro ao cancelar subscription:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = async (
    title: string,
    body: string
  ): Promise<void> => {
    if (!isSupported || permission !== 'granted') return;

    try {
      await notificationManager.showNotification({ title, body });
    } catch (error) {
      console.error('Erro ao mostrar notificação:', error);
    }
  };

  return {
    permission,
    isSupported,
    isSubscribed,
    isLoading,
    requestPermission,
    subscribe,
    unsubscribe,
    showNotification,
  };
}
