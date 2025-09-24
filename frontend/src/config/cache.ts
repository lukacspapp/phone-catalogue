const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

const PHONE_LIST_STALE_TIME = 10 * MINUTE;
const PHONE_LIST_GC_TIME = 30 * MINUTE;

const PHONE_DETAILS_STALE_TIME = 30 * MINUTE;
const PHONE_DETAILS_GC_TIME = 2 * HOUR;

const DEFAULT_STALE_TIME = 5 * MINUTE;
const DEFAULT_RETRY_DELAY_MAX = 30 * 1000;

export const cacheConfig = {
  phoneList: {
    staleTime: PHONE_LIST_STALE_TIME,
    gcTime: PHONE_LIST_GC_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    keepPreviousData: true,
  },

  phoneDetails: {
    staleTime: PHONE_DETAILS_STALE_TIME,
    gcTime: PHONE_DETAILS_GC_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  },

  defaults: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex: number) => Math.min(1000 * Math.pow(2, attemptIndex), DEFAULT_RETRY_DELAY_MAX),
      staleTime: DEFAULT_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
} as const;