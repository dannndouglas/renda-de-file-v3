'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProdutos } from '@/hooks/use-produtos';
import { ProductCard } from '@/components/catalog/ProductCard';
import { SearchBox } from '@/components/search/SearchBox';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFilterStore } from '@/stores/use-filter-store';
import { useSearchStore } from '@/stores/use-search-store';
import { PublicLayout } from '@/components/layouts/PublicLayout';

function CatalogoContent() {
  const searchParams = useSearchParams();
  const { filtros, setFiltro, removeFiltro, limparFiltros } = useFilterStore();
  const { query, setQuery } = useSearchStore();
  const { data: allProdutos = [], isLoading: loading } = useProdutos();
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Aplicar filtros e busca localmente
  const produtos = allProdutos.filter((produto: any) => {
    // Filtro de busca por texto
    if (query) {
      const searchLower = query.toLowerCase();
      const matchesNome = produto.nome?.toLowerCase().includes(searchLower);
      const matchesDescricao = produto.descricao
        ?.toLowerCase()
        .includes(searchLower);
      const matchesDescricaoBreve = produto.descricaoBreve
        ?.toLowerCase()
        .includes(searchLower);

      if (!matchesNome && !matchesDescricao && !matchesDescricaoBreve) {
        return false;
      }
    }

    // Filtro de categoria
    if (filtros.categoria) {
      if (produto.categoria !== filtros.categoria.toLowerCase()) {
        return false;
      }
    }

    // Filtro de disponibilidade
    if (filtros.disponibilidade) {
      const disponibilidadeEsperada =
        filtros.disponibilidade === 'DISPONIVEL'
          ? 'disponivel'
          : 'sob-encomenda';
      if (produto.disponibilidade !== disponibilidadeEsperada) {
        return false;
      }
    }

    // Filtro de preço mínimo
    if (filtros.precoMin !== undefined && filtros.precoMin > 0) {
      if (!produto.preco || produto.preco < filtros.precoMin) {
        return false;
      }
    }

    // Filtro de preço máximo
    if (filtros.precoMax !== undefined && filtros.precoMax > 0) {
      if (!produto.preco || produto.preco > filtros.precoMax) {
        return false;
      }
    }

    return true;
  });

  const paginatedProdutos = produtos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(produtos.length / itemsPerPage);

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl">
          Catálogo de Produtos
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filtros */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold">Filtros</h2>
              {/* Filtros serão implementados em breve */}
              <p className="text-sm text-gray-500">Em desenvolvimento</p>
            </div>
          </aside>

          {/* Produtos */}
          <div className="lg:col-span-3">
            {/* Busca */}
            <div className="mb-6">
              {/* SearchBox será implementado em breve */}
              <input
                type="search"
                placeholder="Buscar produtos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Resultados */}
            <div className="mb-4 text-sm text-gray-600">
              {produtos.length} produtos encontrados
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : produtos.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">Nenhum produto encontrado</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedProdutos.map((produto: any) => (
                    <ProductCard key={produto._id} produto={produto} />
                  ))}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      Anterior
                    </Button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (p) => (
                          <Button
                            key={p}
                            variant={p === page ? 'default' : 'outline'}
                            onClick={() => setPage(p)}
                            className="w-10"
                          >
                            {p}
                          </Button>
                        )
                      )}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                    >
                      Próximo
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense
      fallback={
        <PublicLayout>
          <div className="flex min-h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </PublicLayout>
      }
    >
      <CatalogoContent />
    </Suspense>
  );
}
