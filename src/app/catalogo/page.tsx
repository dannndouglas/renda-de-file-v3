'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { sanityClient } from '@/lib/sanity/client';
import { ProductCard } from '@/components/catalog/ProductCard';
import { SearchBox } from '@/components/search/SearchBox';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFilterStore } from '@/stores/use-filter-store';
import { useSearchStore } from '@/stores/use-search-store';

const PRODUTOS_QUERY = `*[_type == "produto" && 
  $search == "" || nome match $search + "*" || descricao match $search + "*"
] {
  _id,
  nome,
  slug,
  descricao,
  imagens,
  categoria,
  disponibilidade,
  preco,
  associacao->{
    _id,
    nome,
    whatsapp
  }
} | order(createdAt desc)`;

function CatalogoContent() {
  const searchParams = useSearchParams();
  const { filtros, setFiltro, removeFiltro, limparFiltros } = useFilterStore();
  const { query, setQuery } = useSearchStore();
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProdutos = async () => {
      setLoading(true);
      try {
        const data = await sanityClient.fetch(PRODUTOS_QUERY, {
          search: query || ''
        });

        // Aplicar filtros localmente
        let filteredData = data;

        if (filtros.categoria) {
          filteredData = filteredData.filter((p: any) => 
            p.categoria === filtros.categoria!.toLowerCase()
          );
        }

        if (filtros.disponibilidade) {
          filteredData = filteredData.filter((p: any) => 
            p.disponibilidade === (filtros.disponibilidade === 'DISPONIVEL' ? 'disponivel' : 'sob_encomenda')
          );
        }

        if (filtros.precoMin !== undefined && filtros.precoMin > 0) {
          filteredData = filteredData.filter((p: any) => 
            p.preco >= filtros.precoMin!
          );
        }

        if (filtros.precoMax !== undefined && filtros.precoMax > 0) {
          filteredData = filteredData.filter((p: any) => 
            p.preco <= filtros.precoMax!
          );
        }

        setProdutos(filteredData);
      } catch (error) {
        console.error('[CATALOGO] Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [query, filtros]);


  const paginatedProdutos = produtos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(produtos.length / itemsPerPage);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Catálogo de Produtos
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Filtros</h2>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum produto encontrado</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProdutos.map((produto) => (
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
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Button
                          key={p}
                          variant={p === page ? 'default' : 'outline'}
                          onClick={() => setPage(p)}
                          className="w-10"
                        >
                          {p}
                        </Button>
                      ))}
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
    </main>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <CatalogoContent />
    </Suspense>
  );
}