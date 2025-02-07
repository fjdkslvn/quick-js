import Footer from "@/components/footer";
import Header from "@/components/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}){
  
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Header/>
        {children}
      </div>
      <Footer/>
    </div>
  )
}