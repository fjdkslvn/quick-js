'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { linkData } from '@/constants/fucntionData';
import { useEffect } from "react";

const Sidebar: React.FC = () => {
  const pathName = usePathname();

  return (
    <nav className="w-60 p-2">
      {linkData.map((linkInfo) => (
        <>
          <Link
            key={linkInfo.href}
            href={linkInfo.href}
            className={pathName === linkInfo.href ? "text-blue-500 font-bold pl-2 h-9 mb-1 flex items-center rounded bg-blue-50" : "text-gray-600 pl-2 h-9 mb-1 flex items-center rounded hover:bg-gray-100"}
          >
            {linkInfo.label}
          </Link>
          {linkInfo.funcList.map((funcInfo) => (
              <Link
                key={funcInfo.href}
                href={funcInfo.href}
                className={pathName === funcInfo.href ? "text-blue-500 font-bold pl-2 h-9 ml-3 mb-1 flex items-center rounded bg-blue-50" : "text-gray-600 pl-2 h-9 ml-3 mb-1 flex items-center rounded hover:bg-gray-100"}
              >
                {funcInfo.label}
              </Link>
          ))}
        </>
      ))}
    </nav>
  );
};

export default Sidebar;