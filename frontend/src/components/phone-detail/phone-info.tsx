import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import type { Phone } from '@/types/phone';

interface PhoneInfoProps {
  phone: Phone;
}

export function PhoneInfo({ phone }: PhoneInfoProps) {
  const handleAddToCart = () => {
    console.log('Add to cart:', phone.name);
    alert('Added to cart: ' + phone.name);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-3xl font-bold">{phone.name}</h1>
          <Badge variant={phone.inStock ? "default" : "secondary"} className="ml-4">
            {phone.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground mb-4">{phone.brand}</p>
        <p className="text-4xl font-bold text-primary mb-6">
          {formatPrice(phone.price)}
        </p>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-3">Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          {phone.description}
        </p>
      </div>

      <Separator />

      <Button
        size="lg"
        className="w-full"
        disabled={!phone.inStock}
        onClick={handleAddToCart}
      >
        {phone.inStock ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </div>
  );
}
