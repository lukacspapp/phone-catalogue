
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { formatPrice, truncateText } from '@/lib/utils';
import { BrandBadge } from './brand-badge';
import type { Phone } from '../types/phone';

interface PhoneCardProps {
  phone: Phone;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative p-6 pb-4 bg-card">
        <div className="aspect-square overflow-hidden rounded-xl shadow-sm">
          <img
            src={phone.image}
            alt={phone.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="absolute top-8 right-8">
          <Badge variant={phone.inStock ? "default" : "secondary"}>
            {phone.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <div className="absolute top-8 left-8">
          <BrandBadge brand={phone.brand} />
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 pt-2">
        <div className="mb-4">
          <CardTitle className="text-xl font-bold line-clamp-2 mb-2">
            {phone.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {phone.brand}
          </CardDescription>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-1">
          {truncateText(phone.description, 120)}
        </p>

        <div className="space-y-4">
          <div className="text-3xl font-bold text-primary">
            {formatPrice(phone.price)}
          </div>

          <Button
            className="w-full h-12 text-base font-medium"
            onClick={() => navigate(`/phone/${phone.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
