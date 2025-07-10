import { Metadata } from 'next';
import { PageHeader } from '@/components/ui/page-header';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { HistoriaClient } from '@/components/pages/HistoriaClient';
import { Calendar, MapPin, Users } from 'lucide-react';
import { sanityClient } from '@/lib/sanity/client';
import { PAGINA_HISTORIA_QUERY } from '@/lib/sanity/queries';

interface PaginaHistoria {
  titulo?: string;
  introducao?: string;
  imagemPrincipal?: any;
  timeline?: Array<{
    ano: string;
    titulo: string;
    descricao: string;
    icone?: string;
    imagem?: any;
  }>;
  tecnicas?: Array<{
    nome: string;
    descricao: string;
    dificuldade: string;
    imagem?: any;
  }>;
  impacto?: {
    texto?: string;
    estatisticas?: Array<{
      numero: number;
      label: string;
      icone?: string;
    }>;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

async function getPaginaHistoria(): Promise<PaginaHistoria | null> {
  try {
    const data = await sanityClient.fetch(
      PAGINA_HISTORIA_QUERY,
      {},
      {
        next: { revalidate: 3600 }, // Revalidar a cada hora
      }
    );
    return data;
  } catch (error) {
    console.error('[HISTORIA] Erro ao buscar dados:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const paginaHistoria = await getPaginaHistoria();
  
  return {
    title: paginaHistoria?.seo?.metaTitle || paginaHistoria?.titulo || 'História - Renda de Filé',
    description: paginaHistoria?.seo?.metaDescription || paginaHistoria?.introducao || 'Conheça a história centenária da Renda de Filé, patrimônio cultural de Jaguaribe, Ceará.',
    keywords: paginaHistoria?.seo?.keywords || ['renda de filé', 'história', 'jaguaribe', 'ceará', 'artesanato', 'cultura'],
  };
}

export default async function HistoriaPage() {
  const paginaHistoria = await getPaginaHistoria();

  return (
    <PublicLayout>
      <PageHeader
        title={paginaHistoria?.titulo || "A História da Renda de Filé"}
        subtitle="Patrimônio Cultural Imaterial"
        description={paginaHistoria?.introducao || "Mais de 300 anos de tradição, arte e cultura preservados pelas mãos habilidosas das rendeiras de Jaguaribe, Ceará"}
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
        <HistoriaClient paginaHistoria={paginaHistoria} />
      </div>
    </PublicLayout>
  );
}
