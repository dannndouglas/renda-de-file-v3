import { Users, Package, Calendar } from 'lucide-react';

interface StatsSectionProps {
  rendeiras?: number;
  produtos?: number;
  anosTradicao?: number;
}

export function StatsSection({
  rendeiras = 0,
  produtos = 0,
  anosTradicao = 300,
}: StatsSectionProps) {
  const stats = [
    {
      icon: Users,
      value: rendeiras,
      label: 'Rendeiras Ativas',
      suffix: '+',
    },
    {
      icon: Package,
      value: produtos,
      label: 'Produtos Únicos',
      suffix: '+',
    },
    {
      icon: Calendar,
      value: anosTradicao,
      label: 'Anos de Tradição',
      suffix: '',
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <Icon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="mb-2 text-4xl font-bold text-gray-900">
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
