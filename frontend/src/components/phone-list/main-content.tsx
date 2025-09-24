import { PaginationComponent } from '@/components/pagination-component';
import type { PaginatedResponse } from '@/types/phone';
import { EmptyState } from './empty-state';
import { LoadingGrid } from './loading-grid';
import { LoadingOverlay } from './loading-overlay';
import { PhoneGrid } from './phone-grid';
import { ResultsHeader } from './result-header';

interface MainContentProps {
  data?: PaginatedResponse;
  isLoading: boolean;
  isFetching: boolean;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function MainContent({
  data,
  isLoading,
  isFetching,
  pageSize,
  currentPage,
  onPageChange
}: MainContentProps) {
  const showLoading = isLoading || isFetching;

  return (
    <div className="lg:col-span-3">
      <div className="relative">
        <LoadingOverlay show={isFetching && !isLoading} />

        {data && !showLoading && (
          <ResultsHeader
            currentPage={currentPage}
            itemsPerPage={data.pagination.itemsPerPage}
            totalItems={data.pagination.totalItems}
            totalPages={data.pagination.totalPages}
          />
        )}

        {isLoading && <LoadingGrid count={pageSize} />}

        {data && !isLoading && (
          <>
            {data.data.length > 0 ? (
              <>
                <PhoneGrid phones={data.data} />
                {data.pagination.totalPages > 1 && (
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={data.pagination.totalPages}
                    hasNext={currentPage < data.pagination.totalPages}
                    hasPrevious={currentPage > 1}
                    onPageChange={onPageChange}
                  />
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </div>
    </div>
  );
}
