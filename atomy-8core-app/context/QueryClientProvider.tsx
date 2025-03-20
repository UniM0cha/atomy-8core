import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

export default function QueryClientProvider({ children }: { children: ReactNode }) {
  return <ReactQueryClientProvider client={queryClient}>{children}</ReactQueryClientProvider>;
}
