import Navbar from "@/components/navbar";
import { SideMenu } from '@/recoil/atom';

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}){

  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/sideMenu', { next: { revalidate: 600 } });
  const sideMenuList:SideMenu[] = await resp.json();
  
  return (
    <>
      <Navbar sideMenuList={sideMenuList}/>
      {children}
    </>
  )
}