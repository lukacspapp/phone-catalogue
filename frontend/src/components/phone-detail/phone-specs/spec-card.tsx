import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface SpecCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function SpecCard({ icon: IconComponent, label, value }: SpecCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center p-4">
        <IconComponent className="h-8 w-8 text-muted-foreground mr-4" />
        <div>
          <p className="font-medium capitalize">{label}</p>
          <p className="text-sm text-muted-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
