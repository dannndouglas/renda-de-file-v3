import { Metadata } from 'next';
import { Suspense } from 'react';
import { CatalogoClient } from '@/components/pages/CatalogoClient';
import { PublicLayout } from '@/components/layouts/PublicLayout';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Catálogo de Produtos - Renda de Filé',
  description: 'Explore nossa coleção de peças únicas de Renda de Filé, criadas com dedicação e maestria pelas rendeiras de Jaguaribe',
};

export default function CatalogoPage() {
  return (
    <PublicLayout>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        }
      >
        <CatalogoClient />
      </Suspense>
    </PublicLayout>
  );
}