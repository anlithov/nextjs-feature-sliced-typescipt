import React, { FC, ReactNode, useState } from 'react';
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { JWT_LOCAL_STORAGE_KEYS } from '../../shared/lib/constants/jwt-keys.const';
import { ROUTES_NAMES } from '../../shared/lib/constants/routes-names.const';

const mutationCache = new MutationCache({
  onError: (error: any) => {
    if (error.response?.status === 403) {
      localStorage.removeItem(JWT_LOCAL_STORAGE_KEYS.USER_ACCESS_TOKEN);
      window.location.href = window.location.origin + ROUTES_NAMES.LOGIN;
    }
  },
});

export interface Props {
  children: ReactNode;
}
const QueryProvider: FC<Props> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache,
        defaultOptions: {
          queries: {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            cacheTime: Infinity,
            retry: 1,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children} <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
