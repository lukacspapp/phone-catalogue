import { useState, useCallback } from 'react';

interface UsePaginationProps {
  pageSize?: number;
}

export function usePagination({ pageSize = 12 }: UsePaginationProps = {}) {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage,
    pageSize,
    goToPage,
    resetToFirstPage,
  };
}
