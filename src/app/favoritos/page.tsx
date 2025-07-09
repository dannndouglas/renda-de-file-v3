'use client';

import { Metadata } from 'next';
import { useFavoritesStore } from '@/stores/use-favorites-store';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function FavoritosPage() {
  const { items, limparFavoritos, getQuantidadeFavoritos } = useFavoritesStore();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-amber-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              Seus Favoritos
            </h1>
            <p className="text-amber-700 mb-8">
              Você ainda não tem produtos favoritos
            </p>
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <div className="text-center text-amber-600">
                  <Heart className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Nenhum Favorito Ainda
                  </h3>
                  <p className="text-sm mb-4">
                    Explore nosso catálogo e adicione produtos aos seus favoritos para acessá-los rapidamente depois.
                  </p>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Explorar Catálogo
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-900 mb-2">
              Seus Favoritos
            </h1>
            <p className="text-amber-700">
              {getQuantidadeFavoritos()} {getQuantidadeFavoritos() === 1 ? 'produto favorito' : 'produtos favoritos'}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={limparFavoritos}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
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
        <div className="mt-12 p-8 bg-amber-100 rounded-lg text-center">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">
            Descubra Mais Produtos
          </h3>
          <p className="text-amber-700 mb-6">
            Explore nosso catálogo completo e encontre mais peças únicas da Renda de Filé
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/catalogo"
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Ver Catálogo Completo
            </Link>
            <Link
              href="/associacoes"
              className="px-6 py-3 bg-white text-amber-900 border border-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Conhecer Associações
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}