'use client'

import { RecoilRoot } from 'recoil';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <div className="w-full">
      <RecoilRoot>
        {children}
      </RecoilRoot>
    </div>
  )
}