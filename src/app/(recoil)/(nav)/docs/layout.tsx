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
        {children}
      </div>
    </div>
  )
}