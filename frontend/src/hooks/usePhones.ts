import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { phoneApi } from '@/lib/api';
import type { PhoneFilters, PaginatedResponse, Phone } from '@/types/phone';
import { cacheConfig } from '../config/cache';

export const usePhones = (
  filters: PhoneFilters = {},
  options?: Omit<UseQueryOptions<PaginatedResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['phones', filters],
    queryFn: () => phoneApi.getPhones(filters),
    ...cacheConfig.phoneList,
    ...options,
  });
};

export const usePhone = (
  id: number,
  options?: Omit<UseQueryOptions<Phone, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: ['phone', id],
    queryFn: () => phoneApi.getPhone(id),
    enabled: !!id,
    ...cacheConfig.phoneDetails,
    ...options,
  });
};
