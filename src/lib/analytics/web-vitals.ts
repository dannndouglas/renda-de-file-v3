import { Metric } from 'web-vitals';

interface WebVitalData {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
  url: string;
  timestamp: number;
}

class WebVitalsTracker {
  private static instance: WebVitalsTracker;
  private metrics: WebVitalData[] = [];
  private isTracking = false;

  private constructor() {}

  static getInstance(): WebVitalsTracker {
    if (!WebVitalsTracker.instance) {
      WebVitalsTracker.instance = new WebVitalsTracker();
    }
    return WebVitalsTracker.instance;
  }

  async startTracking(): Promise<void> {
    if (this.isTracking || typeof window === 'undefined') {
      return;
    }

    this.isTracking = true;

    try {
      // Importar web-vitals dinamicamente para evitar SSR
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');

      // Configurar handlers para cada métrica
      const handleMetric = (metric: Metric) => {
        this.recordMetric(metric);
      };

      onCLS(handleMetric);
      onINP(handleMetric); // Substitui FID
      onFCP(handleMetric);
      onLCP(handleMetric);
      onTTFB(handleMetric);

      console.log('Web Vitals tracking iniciado');
    } catch (error) {
      console.error('Erro ao iniciar Web Vitals tracking:', error);
    }
  }

  private recordMetric(metric: Metric): void {
    const webVitalData: WebVitalData = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
      url: window.location.href,
      timestamp: Date.now(),
    };

    this.metrics.push(webVitalData);
    this.sendToAnalytics(webVitalData);
    
    // Log para debug
    console.log(`${metric.name}: ${metric.value} (${metric.rating})`);
  }

  private async sendToAnalytics(data: WebVitalData): Promise<void> {
    try {
      // Enviar para API interna
      await fetch('/api/v1/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        keepalive: true,
      });

      // Enviar para Google Analytics se configurado
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', data.name, {
          event_category: 'Web Vitals',
          event_label: data.id,
          value: Math.round(data.name === 'CLS' ? data.value * 1000 : data.value),
          non_interaction: true,
        });
      }

    } catch (error) {
      console.error('Erro ao enviar métricas:', error);
    }
  }

  getMetrics(): WebVitalData[] {
    return [...this.metrics];
  }

  getLatestMetrics(): Record<string, WebVitalData> {
    const latest: Record<string, WebVitalData> = {};
    
    for (const metric of this.metrics) {
      if (!latest[metric.name] || metric.timestamp > latest[metric.name].timestamp) {
        latest[metric.name] = metric;
      }
    }
    
    return latest;
  }

  getPerformanceScore(): {
    score: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    metrics: Record<string, { value: number; rating: string; weight: number }>;
  } {
    const latest = this.getLatestMetrics();
    const weights = {
      CLS: 0.15,
      FID: 0.25,
      FCP: 0.15,
      LCP: 0.25,
      TTFB: 0.20,
    };

    let totalScore = 0;
    let totalWeight = 0;
    const metricsInfo: Record<string, { value: number; rating: string; weight: number }> = {};

    for (const [name, weight] of Object.entries(weights)) {
      const metric = latest[name];
      if (metric) {
        const score = this.getMetricScore(metric);
        totalScore += score * weight;
        totalWeight += weight;
        
        metricsInfo[name] = {
          value: metric.value,
          rating: metric.rating,
          weight,
        };
      }
    }

    const finalScore = totalWeight > 0 ? totalScore / totalWeight : 0;
    const rating = finalScore >= 0.9 ? 'good' : finalScore >= 0.5 ? 'needs-improvement' : 'poor';

    return {
      score: Math.round(finalScore * 100),
      rating,
      metrics: metricsInfo,
    };
  }

  private getMetricScore(metric: WebVitalData): number {
    switch (metric.rating) {
      case 'good':
        return 1;
      case 'needs-improvement':
        return 0.5;
      case 'poor':
        return 0;
      default:
        return 0;
    }
  }

  // Métricas customizadas
  trackCustomMetric(name: string, value: number, unit = 'ms'): void {
    const customMetric: WebVitalData = {
      name: `custom_${name}`,
      value,
      rating: 'good', // Para métricas customizadas, sempre 'good'
      delta: value,
      id: `custom_${Date.now()}`,
      navigationType: 'navigate',
      url: window.location.href,
      timestamp: Date.now(),
    };

    this.metrics.push(customMetric);
    this.sendToAnalytics(customMetric);
  }

  trackPageLoad(): void {
    if (typeof window === 'undefined') return;

    const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (perfData) {
      this.trackCustomMetric('dom_content_loaded', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
      this.trackCustomMetric('page_load_time', perfData.loadEventEnd - perfData.loadEventStart);
      this.trackCustomMetric('dns_lookup', perfData.domainLookupEnd - perfData.domainLookupStart);
      this.trackCustomMetric('tcp_connection', perfData.connectEnd - perfData.connectStart);
      this.trackCustomMetric('server_response', perfData.responseEnd - perfData.requestStart);
    }
  }

  trackResourceTiming(): void {
    if (typeof window === 'undefined') return;

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const resourceStats = {
      images: { count: 0, totalSize: 0, avgLoadTime: 0 },
      scripts: { count: 0, totalSize: 0, avgLoadTime: 0 },
      stylesheets: { count: 0, totalSize: 0, avgLoadTime: 0 },
    };

    resources.forEach(resource => {
      const loadTime = resource.responseEnd - resource.requestStart;
      const size = resource.transferSize || 0;

      if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
        resourceStats.images.count++;
        resourceStats.images.totalSize += size;
        resourceStats.images.avgLoadTime += loadTime;
      } else if (resource.name.match(/\.(js)$/i)) {
        resourceStats.scripts.count++;
        resourceStats.scripts.totalSize += size;
        resourceStats.scripts.avgLoadTime += loadTime;
      } else if (resource.name.match(/\.(css)$/i)) {
        resourceStats.stylesheets.count++;
        resourceStats.stylesheets.totalSize += size;
        resourceStats.stylesheets.avgLoadTime += loadTime;
      }
    });

    // Calcular médias e enviar métricas
    Object.entries(resourceStats).forEach(([type, stats]) => {
      if (stats.count > 0) {
        this.trackCustomMetric(`${type}_count`, stats.count, 'count');
        this.trackCustomMetric(`${type}_total_size`, Math.round(stats.totalSize / 1024), 'kb');
        this.trackCustomMetric(`${type}_avg_load_time`, Math.round(stats.avgLoadTime / stats.count), 'ms');
      }
    });
  }

  generateReport(): string {
    const latest = this.getLatestMetrics();
    const score = this.getPerformanceScore();
    
    let report = `=== Web Vitals Report ===\n`;
    report += `Overall Score: ${score.score}/100 (${score.rating})\n\n`;
    
    report += `Core Web Vitals:\n`;
    Object.entries(latest).forEach(([name, metric]) => {
      if (['CLS', 'FID', 'LCP'].includes(name)) {
        report += `${name}: ${metric.value}${name === 'CLS' ? '' : 'ms'} (${metric.rating})\n`;
      }
    });
    
    report += `\nOther Metrics:\n`;
    Object.entries(latest).forEach(([name, metric]) => {
      if (!['CLS', 'FID', 'LCP'].includes(name)) {
        report += `${name}: ${metric.value}${name === 'CLS' ? '' : 'ms'} (${metric.rating})\n`;
      }
    });
    
    return report;
  }
}

export default WebVitalsTracker;