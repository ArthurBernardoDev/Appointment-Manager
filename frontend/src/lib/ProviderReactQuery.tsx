import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { ReactNode } from "react"

const queryClient = new QueryClient()

interface ProviderReactQueryProps {
  children: ReactNode
}
export const ProviderReactQuery: React.FC<ProviderReactQueryProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)