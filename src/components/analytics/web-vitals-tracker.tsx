'use client';

import { useEffect } from 'react';
import WebVitalsManager from '@/lib/analytics/web-vitals';

export function WebVitalsTracker() {
  useEffect(() => {
    const tracker = WebVitalsManager.getInstance();
    
    // Iniciar tracking
    tracker.startTracking();
    
    // Track métricas de carregamento da página
    if (document.readyState === 'complete') {
      tracker.trackPageLoad();
      tracker.trackResourceTiming();
    } else {
      window.addEventListener('load', () => {
        tracker.trackPageLoad();
        tracker.trackResourceTiming();
      });
    }

    // Track mudanças de rota (para SPAs)
    const handleRouteChange = () => {
      // Pequeno delay para garantir que a página tenha carregado
      setTimeout(() => {
        tracker.trackCustomMetric('route_change', performance.now());
      }, 100);
    };

    // Para Next.js App Router
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null; // Este componente não renderiza nada
}

export function reportWebVitals(metric: any) {
  // Esta função é chamada automaticamente pelo Next.js
  // quando configurada no _app.tsx ou layout.tsx
  console.log('Web Vital:', metric);
  
  // Opcionalmente enviar para serviços de analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
}