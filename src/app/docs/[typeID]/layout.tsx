'use client'

import { RecoilRoot } from 'recoil';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <div className="w-full mx-16 my-8">
      <RecoilRoot>
        {children}
      </RecoilRoot>
    </div>
  )
}