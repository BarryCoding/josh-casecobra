'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
