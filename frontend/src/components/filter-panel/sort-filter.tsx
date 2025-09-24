import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PhoneFilters } from '@/types/phone';

interface SortFilterProps {
  sortBy?: PhoneFilters['sortBy'];
  sortOrder?: PhoneFilters['sortOrder'];
  onSortByChange: (value: PhoneFilters['sortBy']) => void;
  onSortOrderChange: (value: PhoneFilters['sortOrder']) => void;
}

export function SortFilter({ sortBy, sortOrder, onSortByChange, onSortOrderChange }: SortFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Sort By</Label>
      <div className="grid grid-cols-2 gap-3">
        <Select
          value={sortBy || 'none'}
          onValueChange={(value) => {
            if (value === 'none') {
              onSortByChange(undefined);
              onSortOrderChange(undefined);
            } else {
              onSortByChange(value as 'name' | 'brand' | 'price');
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose field..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Sorting</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="brand">Brand</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder || 'default'}
          onValueChange={(value) => onSortOrderChange(value === 'default' ? undefined : value as 'asc' | 'desc')}
          disabled={!sortBy}
        >
          <SelectTrigger>
            <SelectValue placeholder="Order..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="asc">Ascending ⬆</SelectItem>
            <SelectItem value="desc">Descending ⬇</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
