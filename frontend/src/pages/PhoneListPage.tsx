import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePhones } from '@/hooks/usePhones';
import type { PhoneFilters } from '@/types/phone';
import { FilterSidebar } from '../components/phone-list/filter-sidebar';
import { MainContent } from '../components/phone-list/main-content';
import { PageHeader } from '../components/phone-list/page-header';

export function PhoneListPage() {
  const [filterCriteria, setFilterCriteria] = useState<Omit<PhoneFilters, 'page' | 'limit'>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);

  const filters: PhoneFilters = {
    ...filterCriteria,
    page: currentPage,
    limit: pageSize,
  };

  const { data, isLoading, error, isFetching } = usePhones(filters);

  const handleFiltersChange = (newFilters: Omit<PhoneFilters, 'page' | 'limit'>) => {
    setFilterCriteria(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setFilterCriteria({});
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Alert variant="destructive">
          <AlertDescription>Error: {error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <PageHeader />

      <div className="grid lg:grid-cols-4 gap-8">
        <FilterSidebar
          filters={filterCriteria}
          onFiltersChange={handleFiltersChange}
          onReset={handleResetFilters}
          totalResults={data?.pagination.totalItems}
        />

        <MainContent
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
