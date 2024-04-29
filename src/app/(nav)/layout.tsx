'use client'

import Navbar from "@/components/navbar";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

export default function Layout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar/>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  )
}