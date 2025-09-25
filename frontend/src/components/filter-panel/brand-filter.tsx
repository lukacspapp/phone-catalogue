import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BRAND_OPTIONS = [
  'Apple', 'Samsung', 'Google', 'Xiaomi', 'Huawei', 'OnePlus',
  'Honor', 'Asus', 'Sony', 'Motorola', 'Nokia', 'Oppo', 'Vivo', 'Realme', 'Nothing',
];

interface BrandFilterProps {
  value?: string;
  onValueChange: (value: string | undefined) => void;
}

export function BrandFilter({ value, onValueChange }: BrandFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Brand</Label>
      <Select
        value={value || 'all'}
        onValueChange={(newValue) => {
          onValueChange(newValue === 'all' ? undefined : newValue);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select brand..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Brands</SelectItem>
          {BRAND_OPTIONS.map((brand) => (
            <SelectItem key={brand} value={brand}>
              {brand}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
