'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, CalendarDays } from 'lucide-react';
import { useFavoritesStore } from '@/stores/use-favorites-store';
import { useWhatsAppStore } from '@/stores/use-whatsapp-store';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProductCardProps {
  produto: {
    _id: string;
    nome: string;
    slug: {
      current: string;
    };
    descricao?: string;
    imagemPrincipal?: any;
    imagens?: Array<{
      asset: {
        url: string;
      };
    }>;
    categoria: string;
    disponibilidade: string;
    preco?: number;
    associacao?: {
      _id: string;
      nome: string;
      whatsapp?: string;
    };
  };
  showFavoriteButton?: boolean;
  showAddedDate?: boolean;
}

export function ProductCard({ 
  produto, 
  showFavoriteButton = true, 
  showAddedDate = false 
}: ProductCardProps) {
  const imageUrl = produto.imagens?.[0]?.asset?.url || produto.imagemPrincipal;
  const isDisponivel = produto.disponibilidade === 'disponivel';
  
  const { isFavorito, toggleFavorito, items } = useFavoritesStore();
  const { registrarClique } = useWhatsAppStore();
  
  const favoriteItem = items.find(item => item.id === produto._id);
  const isFavoriteItem = isFavorito(produto._id);

  const handleFavoriteToggle = () => {
    if (produto.associacao) {
      toggleFavorito({
        id: produto._id,
        nome: produto.nome,
        imagemPrincipal: imageUrl,
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
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <Link href={`/produto/${produto.slug.current}`}>
        <div className="aspect-square relative bg-gray-100">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={produto.nome}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Sem imagem
            </div>
          )}
          <div className="absolute top-2 right-2">
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
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-orange-600 transition-colors">
            {produto.nome}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {produto.descricao}
        </p>

        <div className="flex items-center justify-between mb-3">
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
          <p className="text-xs text-gray-500 mb-3">
            Por {produto.associacao.nome}
          </p>
        )}

        {showAddedDate && favoriteItem && (
          <p className="text-xs text-amber-600 mb-3 flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            Adicionado {formatDistanceToNow(new Date(favoriteItem.adicionadoEm), { addSuffix: true, locale: ptBR })}
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
              className={isFavoriteItem ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`h-4 w-4 ${isFavoriteItem ? 'fill-current' : ''}`} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}