interface ResultsHeaderProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export function ResultsHeader({ currentPage, itemsPerPage, totalItems, totalPages }: ResultsHeaderProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mb-6">
      <p className="text-muted-foreground">
        Showing {startItem} to {endItem} of {totalItems} phones
        {totalPages > 1 && (
          <span className="ml-2">• Page {currentPage} of {totalPages}</span>
        )}
      </p>
    </div>
  );
}