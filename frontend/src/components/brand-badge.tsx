import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BrandBadgeProps {
  brand: string;
  className?: string;
}

export function BrandBadge({ brand, className }: BrandBadgeProps) {
  const getBrandColor = (brandName: string) => {
    const normalizedBrand = brandName.toLowerCase();

    switch (normalizedBrand) {
      case 'apple':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'samsung':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'google':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'xiaomi':
        return 'bg-orange-500 hover:bg-orange-600 text-white';
      case 'huawei':
        return 'bg-gray-700 hover:bg-gray-800 text-white';
      case 'oneplus':
        return 'bg-red-600 hover:bg-red-700 text-white';
      default:
        return 'bg-purple-500 hover:bg-purple-600 text-white';
    }
  };

  return (
    <Badge
      className={cn(
        'px-3 py-1 text-xs font-medium transition-colors',
        getBrandColor(brand),
        className
      )}
    >
      {brand}
    </Badge>
  );
}
