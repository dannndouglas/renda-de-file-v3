import { Users, Package, Calendar } from 'lucide-react';

interface StatsSectionProps {
  rendeiras?: number;
  produtos?: number;
  anosTradicao?: number;
}

export function StatsSection({ 
  rendeiras = 0, 
  produtos = 0, 
  anosTradicao = 300 
}: StatsSectionProps) {
  const stats = [
    {
      icon: Users,
      value: rendeiras,
      label: 'Rendeiras Ativas',
      suffix: '+'
    },
    {
      icon: Package,
      value: produtos,
      label: 'Produtos Únicos',
      suffix: '+'
    },
    {
      icon: Calendar,
      value: anosTradicao,
      label: 'Anos de Tradição',
      suffix: ''
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}