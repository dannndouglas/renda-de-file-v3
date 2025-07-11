'use client';

import { Users, Package, Calendar, Star, Heart, Award } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Estatistica {
  numero: number;
  label: string;
  icone?: string;
}

interface StatsSectionProps {
  rendeiras?: number;
  produtos?: number;
  anosTradicao?: number;
  estatisticasCustomizadas?: Estatistica[];
}

export function StatsSection({
  rendeiras = 0,
  produtos = 0,
  anosTradicao = 300,
  estatisticasCustomizadas,
}: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ rendeiras: 0, produtos: 0, anos: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounts({
        rendeiras: Math.floor(rendeiras * easeOut),
        produtos: Math.floor(produtos * easeOut),
        anos: Math.floor(anosTradicao * easeOut),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, rendeiras, produtos, anosTradicao]);

  // Função para mapear ícone string para componente
  const getIconComponent = (iconName?: string) => {
    const iconMap: Record<string, any> = {
      users: Users,
      package: Package,
      calendar: Calendar,
      star: Star,
      heart: Heart,
      award: Award,
    };
    return iconMap[iconName?.toLowerCase() || ''] || Package;
  };

  // Usar estatísticas customizadas se disponíveis, senão usar padrão
  const stats =
    estatisticasCustomizadas && estatisticasCustomizadas.length > 0
      ? estatisticasCustomizadas.map((stat, index) => ({
          icon: getIconComponent(stat.icone),
          value: isVisible ? stat.numero : 0,
          finalValue: stat.numero,
          label: stat.label,
          suffix: '',
        }))
      : [
          {
            icon: Users,
            value: counts.rendeiras,
            finalValue: rendeiras,
            label: 'Rendeiras Ativas',
            suffix: '+',
          },
          {
            icon: Package,
            value: counts.produtos,
            finalValue: produtos,
            label: 'Produtos Únicos',
            suffix: '+',
          },
          {
            icon: Calendar,
            value: counts.anos,
            finalValue: anosTradicao,
            label: 'Anos de Tradição',
            suffix: '',
          },
        ];

  return (
    <section ref={sectionRef} className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`card-3d group transform text-center transition-all duration-700 ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="card-3d-content">
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-200 shadow-lg transition-all duration-500 hover:shadow-xl group-hover:scale-125 group-hover:rotate-12">
                    <Icon className="h-10 w-10 text-orange-600 transition-all duration-300 group-hover:text-orange-700" />
                  </div>
                  <div className="mb-3 text-5xl font-bold text-gray-900 transition-all duration-300 group-hover:text-orange-600">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-lg text-gray-600 transition-all duration-300 group-hover:text-gray-800">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
