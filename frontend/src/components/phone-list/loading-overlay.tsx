interface LoadingOverlayProps {
  show: boolean;
  message?: string;
}

export function LoadingOverlay({ show, message = "Applying filters..." }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
      <div className="bg-background border rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">{message}</span>
        </div>
      </div>
    </div>
  );
}
