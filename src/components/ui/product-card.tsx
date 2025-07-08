import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface ProductCardProps {
  name: string;
  association: string;
  price: string;
  availability: 'available' | 'on-demand';
  imageUrl?: string;
  image?: SanityImageSource;
  onWhatsAppClick?: () => void;
}

export function ProductCard({
  name,
  association,
  price,
  availability,
  imageUrl,
  image,
  onWhatsAppClick,
}: ProductCardProps) {
  const isAvailable = availability === 'available';

  return (
    <Card className="product-card">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-renda-100 to-areia-100">
        {image || imageUrl ? (
          <OptimizedImage
            src={image || imageUrl!}
            alt={name}
            size="card"
            quality="card"
            fill
            className="object-cover"
            placeholderText="Carregando produto..."
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-medium text-renda-600">Imagem em breve</span>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <h3 className="heading-4 mb-2">{name}</h3>
        <p className="body-small mb-3">{association}</p>

        <div className="mb-4 flex items-center justify-between">
          <Badge
            variant="secondary"
            className={
              isAvailable
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }
          >
            {isAvailable ? 'Disponível' : 'Sob Encomenda'}
          </Badge>
          <span className="font-semibold text-renda-600">{price}</span>
        </div>

        <Button className="btn-whatsapp w-full" onClick={onWhatsAppClick}>
          💬 {isAvailable ? 'Conversar no WhatsApp' : 'Encomendar via WhatsApp'}
        </Button>
      </CardContent>
    </Card>
  );
}
