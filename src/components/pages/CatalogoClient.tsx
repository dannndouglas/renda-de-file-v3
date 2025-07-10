'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProdutos } from '@/hooks/use-produtos';
import { ProductCard } from '@/components/catalog/ProductCard';
import { SearchBox } from '@/components/search/SearchBox';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ProductFilters } from '@/components/catalog/ProductFilters';
import { AnimatedCard } from '@/components/ui/animated-card';
import { Loader2, Search } from 'lucide-react';
import { useFilterStore } from '@/stores/use-filter-store';
import { useSearchStore } from '@/stores/use-search-store';
import { motion } from 'framer-motion';

export function CatalogoClient() {
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
    <>
      <PageHeader
        title="Catálogo de Produtos"
        subtitle="Artesanato Exclusivo"
        description="Explore nossa coleção de peças únicas de Renda de Filé, criadas com dedicação e maestria pelas rendeiras de Jaguaribe"
        variant="centered"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filtros */}
          <aside className="lg:col-span-1">
            <ProductFilters />
          </aside>

          {/* Produtos */}
          <div className="lg:col-span-3">
            {/* Busca */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Buscar produtos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 shadow-sm transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </motion.div>

            {/* Resultados */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 flex items-center justify-between"
            >
              <p className="text-sm text-gray-600">
                {produtos.length} produtos encontrados
              </p>
            </motion.div>

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
    </>
  );
}