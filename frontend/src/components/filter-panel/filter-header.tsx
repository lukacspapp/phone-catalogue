import { Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CardTitle } from '@/components/ui/card';

interface FilterHeaderProps {
  activeFiltersCount: number;
  totalResults?: number;
}

export function FilterHeader({ activeFiltersCount, totalResults }: FilterHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <CardTitle className="text-lg">Filters</CardTitle>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary">{activeFiltersCount}</Badge>
        )}
      </div>
      {totalResults !== undefined && (
        <span className="text-sm text-muted-foreground">{totalResults} results</span>
      )}
    </div>
  );
}
