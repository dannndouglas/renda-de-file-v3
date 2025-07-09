'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, CalendarDays } from 'lucide-react';
import { useFavoritesStore } from '@/stores/use-favorites-store';
import { useWhatsAppStore } from '@/stores/use-whatsapp-store';
import { urlFor } from '@/lib/sanity/client';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProductCardProps {
  produto: any;
  showFavoriteButton?: boolean;
  showAddedDate?: boolean;
}

export function ProductCard({
  produto,
  showFavoriteButton = true,
  showAddedDate = false,
}: ProductCardProps) {
  // Converter referência do Sanity para URL usando urlFor
  const imageUrl = produto.imagens?.[0]
    ? urlFor(produto.imagens[0]).width(400).height(400).url()
    : produto.imagemPrincipal
      ? urlFor(produto.imagemPrincipal).width(400).height(400).url()
      : null;
  const isDisponivel = produto.disponibilidade === 'disponivel';

  const { isFavorito, toggleFavorito, items } = useFavoritesStore();
  const { registrarClique } = useWhatsAppStore();

  const favoriteItem = items.find((item) => item.id === produto._id);
  const isFavoriteItem = isFavorito(produto._id);

  const handleFavoriteToggle = () => {
    if (produto.associacao) {
      toggleFavorito({
        id: produto._id,
        nome: produto.nome,
        imagemPrincipal: imageUrl || '',
        preco: produto.preco,
        associacao: {
          id: produto.associacao._id,
          nome: produto.associacao.nome,
        },
      });
    }
  };

  const handleWhatsAppClick = () => {
    if (produto.associacao) {
      registrarClique({
        produtoId: produto._id,
        produtoNome: produto.nome,
        associacaoId: produto.associacao._id,
        associacaoNome: produto.associacao.nome,
        tipo: 'COMPRA',
        origem: 'product-card',
      });
    }
  };

  return (
    <Card className="h-full transition-shadow duration-200 hover:shadow-lg">
      <Link href={`/produto/${produto.slug.current}`}>
        <div className="relative aspect-square bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={produto.nome}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              Sem imagem
            </div>
          )}
          <div className="absolute right-2 top-2">
            <Badge
              variant={isDisponivel ? 'default' : 'secondary'}
              className={isDisponivel ? 'bg-green-500' : ''}
            >
              {isDisponivel ? 'Disponível' : 'Sob encomenda'}
            </Badge>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/produto/${produto.slug.current}`}>
          <h3 className="mb-1 line-clamp-2 font-semibold text-gray-900 transition-colors hover:text-orange-600">
            {produto.nome}
          </h3>
        </Link>

        <p className="mb-2 line-clamp-2 text-sm text-gray-600">
          {produto.descricao}
        </p>

        <div className="mb-3 flex items-center justify-between">
          {produto.preco && (
            <span className="text-2xl font-bold text-orange-600">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </span>
          )}
          <Badge variant="outline" className="text-xs">
            {produto.categoria}
          </Badge>
        </div>

        {produto.associacao && (
          <p className="mb-3 text-xs text-gray-500">
            Por {produto.associacao.nome}
          </p>
        )}

        {showAddedDate && favoriteItem && (
          <p className="mb-3 flex items-center gap-1 text-xs text-amber-600">
            <CalendarDays className="h-3 w-3" />
            Adicionado{' '}
            {formatDistanceToNow(new Date(favoriteItem.adicionadoEm), {
              addSuffix: true,
              locale: ptBR,
            })}
          </p>
        )}

        <div className="flex gap-2">
          {produto.associacao?.whatsapp && (
            <Button
              variant="default"
              size="sm"
              className="flex-1 gap-2"
              onClick={handleWhatsAppClick}
              asChild
            >
              <a
                href={`https://wa.me/55${produto.associacao.whatsapp.replace(/\D/g, '')}?text=Olá! Vi o produto "${produto.nome}" no site.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          )}
          {showFavoriteButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleFavoriteToggle}
              className={isFavoriteItem ? 'border-red-500 text-red-500' : ''}
            >
              <Heart
                className={`h-4 w-4 ${isFavoriteItem ? 'fill-current' : ''}`}
              />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
