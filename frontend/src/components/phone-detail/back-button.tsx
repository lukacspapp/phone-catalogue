import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export function BackButton({ onClick, className = "mb-4" }: BackButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={className}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back to Phones
    </Button>
  );
}
