'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useWhatsAppStore } from '@/stores/use-whatsapp-store';
import { urlFor } from '@/lib/sanity/client';

interface ProductCardProps {
  produto: any;
}

export function ProductCard({ produto }: ProductCardProps) {
  // Converter referência do Sanity para URL usando urlFor
  const imageUrl = produto.imagens?.[0]
    ? urlFor(produto.imagens[0]).width(400).height(400).url()
    : produto.imagemPrincipal
      ? urlFor(produto.imagemPrincipal).width(400).height(400).url()
      : null;
  const isDisponivel = produto.disponibilidade === 'disponivel';

  const { registrarClique } = useWhatsAppStore();

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
        </div>
      </CardContent>
    </Card>
  );
}
