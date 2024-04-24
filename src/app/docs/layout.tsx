'use client'

import Sidebar from "@/components/sidebar";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function Layout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid place-items-center">
        <div className="max-w-screen-xl flex flex-row w-full">
          <Sidebar />
          {children}
        </div>
      </div>
    </QueryClientProvider>
  )
}