import Footer from "@/components/footer";
import Header from "@/components/header";
import { SideMenu } from 'sideMenuType';

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}){

  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/sideMenu', { next: { revalidate: 600 } });
  const sideMenuList:SideMenu[] = await resp.json();
  
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <Header sideMenuList={sideMenuList}/>
        {children}
      </div>
      <Footer/>
    </div>
  )
}