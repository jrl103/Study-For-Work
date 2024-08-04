import { QueryClientConfig } from '@tanstack/react-query';

const TEN_MINUTES = 10 * 60 * 1000;

const defaultQueryOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      staleTime: TEN_MINUTES,
      throwOnError: true,
    },
  },
};

export default defaultQueryOptions;
