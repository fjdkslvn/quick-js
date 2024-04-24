'use client'
import { useQuery } from 'react-query';
import Link from "next/link";
import { getSideToDocs } from "@/services/sideMenu";

const Navbar: React.FC = () => {

  const fetchSideToDocs = async () => {
    try {
      const data = await getSideToDocs();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch side to docs');
    }
  };
  
  useQuery(`sideToDocs`, fetchSideToDocs);

  return (
    <div className="border-b border-inherit grid place-items-center sticky top-0 bg-white z-10">
        <nav className="flex flex-row items-center max-w-screen-xl w-full h-16">
            <Link className="ml-6 mr-auto text-lg" href="/">QuickJS</Link>
            <Link className="mr-6" href="/docs/string">작업실</Link>
            <Link className="mr-6" href="/notice">공지사항</Link>
        </nav>
    </div>
  );
};

export default Navbar;