'use client'

import { RecoilRoot } from 'recoil';
import Sidebar from "@/components/sidebar";
import DataInput from "@/components/dataInput";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <div className="grid place-items-center">
      <div className="max-w-screen-xl flex flex-row w-full">
        <Sidebar />
        <div className="w-full mx-16 my-8">
          <RecoilRoot>
            <DataInput />
            {children}
          </RecoilRoot>
        </div>
      </div>
    </div>
  )
}