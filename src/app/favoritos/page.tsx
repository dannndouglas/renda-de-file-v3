'use client';

import { Metadata } from 'next';
import { useFavoritesStore } from '@/stores/use-favorites-store';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layouts/PublicLayout';

export default function FavoritosPage() {
  const { items, limparFavoritos, getQuantidadeFavoritos } =
    useFavoritesStore();

  if (items.length === 0) {
    return (
      <PublicLayout>
        <div className="min-h-screen bg-amber-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold text-amber-900">
                Seus Favoritos
              </h1>
              <p className="mb-8 text-amber-700">
                Você ainda não tem produtos favoritos
              </p>
              <Card className="mx-auto max-w-md">
                <CardContent className="p-6">
                  <div className="text-center text-amber-600">
                    <Heart className="mx-auto mb-4 h-12 w-12" />
                    <h3 className="mb-2 text-lg font-semibold">
                      Nenhum Favorito Ainda
                    </h3>
                    <p className="mb-4 text-sm">
                      Explore nosso catálogo e adicione produtos aos seus
                      favoritos para acessá-los rapidamente depois.
                    </p>
                    <Link
                      href="/catalogo"
                      className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Explorar Catálogo
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-amber-50 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-amber-900">
                Seus Favoritos
              </h1>
              <p className="text-amber-700">
                {getQuantidadeFavoritos()}{' '}
                {getQuantidadeFavoritos() === 1
                  ? 'produto favorito'
                  : 'produtos favoritos'}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={limparFavoritos}
              className="border-red-600 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Limpar Favoritos
            </Button>
          </div>

          {/* Grid de Produtos */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <ProductCard
                key={item.id}
                produto={{
                  _id: item.id,
                  nome: item.nome,
                  imagemPrincipal: item.imagemPrincipal,
                  preco: item.preco,
                  associacao: {
                    _id: item.associacao.id,
                    nome: item.associacao.nome,
                  },
                  slug: { current: item.id }, // Placeholder - idealmente deveria vir do store
                  categoria: 'favorito',
                  disponibilidade: 'disponivel',
                  descricao: '',
                  imagens: [],
                }}
                showFavoriteButton={true}
                showAddedDate={true}
              />
            ))}
          </div>

          {/* Sugestões */}
          <div className="mt-12 rounded-lg bg-amber-100 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-amber-900">
              Descubra Mais Produtos
            </h3>
            <p className="mb-6 text-amber-700">
              Explore nosso catálogo completo e encontre mais peças únicas da
              Renda de Filé
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/catalogo"
                className="rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700"
              >
                Ver Catálogo Completo
              </Link>
              <Link
                href="/associacoes"
                className="rounded-lg border border-amber-600 bg-white px-6 py-3 text-amber-900 transition-colors hover:bg-amber-50"
              >
                Conhecer Associações
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
