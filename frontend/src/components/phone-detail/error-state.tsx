import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorStateProps {
  message: string;
  variant?: "default" | "destructive";
}

export function ErrorState({ message, variant = "destructive" }: ErrorStateProps) {
  return (
    <Alert variant={variant}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
