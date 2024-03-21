'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { getSideMenuData, MenuItem } from "@/services/sideMenu";

const Sidebar: React.FC = () => {
  const [sideMenu, setSideMenu] = useState<MenuItem[]>([]);
  const pathName = usePathname();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const sideMenu = await getSideMenuData();
      setSideMenu(sideMenu);
    } catch (error) {
      throw new Error('Failed to fetch side menu data in /components/sidebar');
    }
  };

  return (
    <nav className="w-60 p-2">
      {sideMenu.map((menu) => (
        <div key={menu.id}>
          <Link
            href={menu.link}
            className={pathName === menu.link ? "text-blue-500 font-bold pl-2 h-9 mb-1 flex items-center rounded bg-blue-50" : "text-gray-600 pl-2 h-9 mb-1 flex items-center rounded hover:bg-gray-100"}
          >
            {menu.name}
          </Link>
          {menu.sub_menus.map((sub_menu) => (
              <Link
                key={sub_menu.id}
                href={sub_menu.link}
                className={pathName === sub_menu.link ? "text-blue-500 font-bold pl-2 h-9 ml-3 mb-1 flex items-center rounded bg-blue-50" : "text-gray-600 pl-2 h-9 ml-3 mb-1 flex items-center rounded hover:bg-gray-100"}
              >
                {sub_menu.name}
              </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;