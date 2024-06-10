import ScrollNav from "@/components/scrollNav";
import Sidebar from "@/components/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <div className="grid place-items-center">
      <div className="max-w-screen-xl display flex-row w-full md:flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="block md:hidden">
          <Sidebar />
          <ScrollNav/>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-full px-8 py-10 lg:px-12">
            {children}
          </div>
          <div className="hidden md:block">
            <ScrollNav/>
          </div>
        </div>
      </div>
    </div>
  )
}