interface StatItem {
  value: string;
  label: string;
}

interface StatsSectionProps {
  title: string;
  subtitle: string;
  stats: StatItem[];
}

export function StatsSection({ title, subtitle, stats }: StatsSectionProps) {
  return (
    <section className="section-padding bg-renda-600 text-white">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4 text-white">{title}</h2>
          <p className="body-large mx-auto max-w-2xl text-renda-100">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-renda-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
