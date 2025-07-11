'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Heart } from 'lucide-react';
import { useWhatsAppStore } from '@/stores/use-whatsapp-store';
import { urlFor } from '@/lib/sanity/client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl">
        <Link href={`/produto/${produto.slug.current}`}>
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-renda-100 to-areia-100">
            {imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt={produto.nome}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="h-12 w-12 text-renda-300" />
                </motion.div>
              </div>
            )}
            <div className="absolute right-2 top-2">
              <Badge
                variant={isDisponivel ? 'default' : 'secondary'}
                className={cn(
                  'shadow-md',
                  isDisponivel
                    ? 'bg-success text-success-foreground hover:bg-success/90'
                    : 'border-warning/20 bg-warning/10 text-warning-foreground'
                )}
              >
                {isDisponivel ? 'Disponível' : 'Sob encomenda'}
              </Badge>
            </div>
          </div>
        </Link>

        <CardContent className="p-4">
          <Link href={`/produto/${produto.slug.current}`}>
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-renda-600">
              {produto.nome}
            </h3>
          </Link>

          {produto.associacao && (
            <p className="mb-2 text-sm font-medium text-renda-600">
              {produto.associacao.nome}
            </p>
          )}

          <p className="mb-3 line-clamp-2 text-sm text-gray-600">
            {produto.descricao || produto.descricaoBreve}
          </p>

          <div className="mb-4 flex items-center justify-between">
            {produto.preco && (
              <motion.span
                className="text-2xl font-bold text-gray-900"
                whileHover={{ scale: 1.05 }}
              >
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </motion.span>
            )}
            <Badge
              variant="outline"
              className="border-renda-200 text-xs text-renda-700"
            >
              {produto.categoria?.charAt(0).toUpperCase() +
                produto.categoria?.slice(1)}
            </Badge>
          </div>

          <div className="flex gap-2">
            {produto.associacao?.whatsapp && (
              <Button
                variant="default"
                size="sm"
                className="ripple flex-1 gap-2 bg-whatsapp text-whatsapp-foreground transition-all duration-300 hover:scale-105 hover:bg-success"
                onClick={handleWhatsAppClick}
                asChild
              >
                <a
                  href={`https://wa.me/55${produto.associacao.whatsapp.replace(/\D/g, '')}?text=Olá! Vi o produto "${produto.nome}" no site da Renda de Filé.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Conversar
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
