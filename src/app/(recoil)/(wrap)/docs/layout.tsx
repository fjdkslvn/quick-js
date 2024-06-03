import ScrollNav from "@/components/scrollNav";
import Sidebar from "@/components/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <div className="grid place-items-center">
      <div className="max-w-screen-xl flex flex-row w-full">
        <Sidebar />
        <div className="flex flex-row w-full">
          <div className="w-full px-8 py-6 lg:px-12">
            {children}
          </div>
          <ScrollNav/>
        </div>
      </div>
    </div>
  )
}