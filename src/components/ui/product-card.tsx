import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface ProductCardProps {
  name: string;
  association: string;
  price: string;
  availability: 'available' | 'on-demand';
  imageUrl?: string;
  onWhatsAppClick?: () => void;
}

export function ProductCard({
  name,
  association,
  price,
  availability,
  imageUrl,
  onWhatsAppClick
}: ProductCardProps) {
  const isAvailable = availability === 'available';
  
  return (
    <Card className="product-card">
      <div className="aspect-square bg-gradient-to-br from-renda-100 to-areia-100 relative overflow-hidden">
        {imageUrl ? (
          <Image 
            src={imageUrl} 
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-renda-600 font-medium">Imagem em breve</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-6">
        <h3 className="heading-4 mb-2">{name}</h3>
        <p className="body-small mb-3">{association}</p>
        
        <div className="flex items-center justify-between mb-4">
          <Badge 
            variant="secondary" 
            className={
              isAvailable 
                ? "bg-green-100 text-green-800" 
                : "bg-orange-100 text-orange-800"
            }
          >
            {isAvailable ? 'Disponível' : 'Sob Encomenda'}
          </Badge>
          <span className="font-semibold text-renda-600">{price}</span>
        </div>
        
        <Button 
          className="btn-whatsapp w-full"
          onClick={onWhatsAppClick}
        >
          💬 {isAvailable ? 'Conversar no WhatsApp' : 'Encomendar via WhatsApp'}
        </Button>
      </CardContent>
    </Card>
  );
}