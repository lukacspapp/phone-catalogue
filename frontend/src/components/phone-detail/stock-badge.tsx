import { Badge } from '@/components/ui/badge';

interface StockBadgeProps {
  inStock: boolean;
  className?: string;
}

export function StockBadge({ inStock, className = "ml-4" }: StockBadgeProps) {
  return (
    <Badge
      variant={inStock ? "default" : "secondary"}
      className={className}
    >
      {inStock ? "In Stock" : "Out of Stock"}
    </Badge>
  );
}
