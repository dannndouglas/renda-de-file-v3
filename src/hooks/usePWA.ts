'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  isUpdateAvailable: boolean;
  isLoading: boolean;
}

interface PWAActions {
  install: () => Promise<boolean>;
  update: () => Promise<void>;
  checkForUpdates: () => Promise<void>;
  toggleSync: (enabled: boolean) => Promise<void>;
}

export function usePWA(): PWAState & PWAActions {
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isUpdateAvailable: false,
    isLoading: false,
  });

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    // Verificar se é PWA instalada
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;
    
    setState(prev => ({
      ...prev,
      isInstalled: isStandalone || isInWebAppiOS,
    }));

    // Listener para beforeinstallprompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setState(prev => ({ ...prev, isInstallable: true }));
    };

    // Listeners para status online/offline
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    // Registrar service worker
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.register('/sw.js');
          setRegistration(reg);

          // Verificar por atualizações
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  setState(prev => ({ ...prev, isUpdateAvailable: true }));
                }
              });
            }
          });
        } catch (error) {
          console.error('SW registration failed:', error);
        }
      }
    };

    // Adicionar event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Registrar SW
    registerSW();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const install = async (): Promise<boolean> => {
    if (!deferredPrompt) return false;

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setState(prev => ({
          ...prev,
          isInstalled: true,
          isInstallable: false,
          isLoading: false,
        }));
        setDeferredPrompt(null);
        return true;
      }
    } catch (error) {
      console.error('Installation failed:', error);
    }

    setState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const update = async (): Promise<void> => {
    if (!registration || !registration.waiting) return;

    setState(prev => ({ ...prev, isLoading: true }));

    // Enviar mensagem para o SW fazer skip waiting
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });

    // Recarregar página quando o novo SW tomar controle
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  };

  const checkForUpdates = async (): Promise<void> => {
    if (!registration) return;

    try {
      await registration.update();
    } catch (error) {
      console.error('Update check failed:', error);
    }
  };

  const toggleSync = async (enabled: boolean): Promise<void> => {
    if (!('serviceWorker' in navigator)) return;

    try {
      if (enabled && 'sync' in window.ServiceWorkerRegistration.prototype) {
        // Registrar background sync
        const reg = await navigator.serviceWorker.ready;
        await reg.sync.register('favoritos-sync');
      }
    } catch (error) {
      console.error('Background sync failed:', error);
    }
  };

  return {
    ...state,
    install,
    update,
    checkForUpdates,
    toggleSync,
  };
}