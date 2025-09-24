interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({
  title = "No phones found",
  message = "Try adjusting your filters"
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-lg text-muted-foreground mb-4">{title}</p>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
