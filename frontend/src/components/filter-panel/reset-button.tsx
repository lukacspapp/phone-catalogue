import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResetButtonProps {
  activeFiltersCount: number;
  onReset: () => void;
}

export function ResetButton({ activeFiltersCount, onReset }: ResetButtonProps) {
  return (
    <div className="pt-4">
      <Button
        onClick={onReset}
        variant={activeFiltersCount > 0 ? "default" : "outline"}
        className={`w-full transition-all duration-300 ${activeFiltersCount > 0
          ? "!bg-black !text-white hover:!bg-gray-800 dark:!bg-white dark:!text-black dark:hover:!bg-gray-200 shadow-md font-medium"
          : ""
          }`}
      >
        <X className="h-4 w-4 mr-2" />
        {activeFiltersCount > 0
          ? `Clear ${activeFiltersCount} Filter${activeFiltersCount === 1 ? '' : 's'}`
          : "Reset All Filters"
        }
      </Button>
    </div>
  );
}
