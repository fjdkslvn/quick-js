'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { linkData } from '@/constants/fucntionData';
import { useEffect } from "react";

const Sidebar: React.FC = () => {
  const pathName = usePathname();

  return (
    <nav className="w-60 p-2">
      {linkData.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathName === link.href ? "text-blue-500 font-bold pl-2 h-9 mb-1 flex items-center rounded bg-blue-50" : "text-gray-600 pl-2 h-9 mb-1 flex items-center rounded hover:bg-gray-100"}
          >
            {link.label}
          </Link>
      ))}
    </nav>
  );
};

export default Sidebar;