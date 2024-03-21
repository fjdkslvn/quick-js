'use client'

import { RecoilRoot } from 'recoil';
import DataInput from "@/components/dataInput";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <div className="w-full mx-16 my-8">
      <RecoilRoot>
        <DataInput />
        {children}
      </RecoilRoot>
    </div>
  )
}