import { Metadata } from 'next';
import { PageHeader } from '@/components/ui/page-header';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { HistoriaClient } from '@/components/pages/HistoriaClient';
import { Calendar, MapPin, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'História - Renda de Filé',
  description:
    'Conheça a história centenária da Renda de Filé, patrimônio cultural de Jaguaribe, Ceará.',
};

export default function HistoriaPage() {
  return (
    <PublicLayout>
      <PageHeader
        title="A História da Renda de Filé"
        subtitle="Patrimônio Cultural Imaterial"
        description="Mais de 300 anos de tradição, arte e cultura preservados pelas mãos habilidosas das rendeiras de Jaguaribe, Ceará"
        variant="centered"
      >
        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Desde 1700</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>Jaguaribe, CE</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>500+ Rendeiras</span>
          </div>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 py-12">
        <HistoriaClient />
      </div>
    </PublicLayout>
  );
}
