import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PriceRangeFilterProps {
  priceMin?: number;
  priceMax?: number;
  onPriceMinChange: (value: number | undefined) => void;
  onPriceMaxChange: (value: number | undefined) => void;
}

export function PriceRangeFilter({
  priceMin,
  priceMax,
  onPriceMinChange,
  onPriceMaxChange
}: PriceRangeFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Price Range</Label>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="priceMin" className="text-sm text-muted-foreground">
            Min Price (HUF)
          </Label>
          <Input
            id="priceMin"
            type="number"
            placeholder="0"
            value={priceMin || ''}
            onChange={(e) => onPriceMinChange(e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="priceMax" className="text-sm text-muted-foreground">
            Max Price (HUF)
          </Label>
          <Input
            id="priceMax"
            type="number"
            placeholder="2000"
            value={priceMax || ''}
            onChange={(e) => onPriceMaxChange(e.target.value ? parseInt(e.target.value) : undefined)}
          />
        </div>
      </div>
    </div>
  );
}
