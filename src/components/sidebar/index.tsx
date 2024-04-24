'use client'

import { useQuery } from 'react-query';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { getSideMenuData } from "@/services/sideMenu";

const Sidebar: React.FC = () => {
  
  const fetchData = async () => {
    try {
      const sideMenu = await getSideMenuData();
      return sideMenu;
    } catch (error) {
      throw new Error('Failed to fetch side menu data in /components/sidebar');
    }
  };
  
  const { data: sideMenu, isLoading, isError } = useQuery(`sideMenu`, fetchData);
  const pathName = usePathname();

  return (
    <nav className="min-w-56 pl-4 py-4 h-max sticky top-16 hidden md:block">
      {sideMenu?.map((menu) => (
        <div key={`menu_${menu.id}`} className="text-sm">
          <Link
            href={menu.link}
            className={pathName === menu.link ? "text-blue-500 font-bold pl-2 h-9 mb-1 flex items-center rounded bg-blue-50" : "text-gray-500 pl-2 h-9 mb-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800"}
          >
            {menu.name}
          </Link>
          {menu.sub_menus.map((sub_menu) => (
              <div className="flex flex-row w-full items-center mb-1" key={`sub_menu_${sub_menu.id}`}>
                <div className="w-px h-6 mx-3 bg-gray-300"></div>
                <Link
                  href={sub_menu.link}
                  className={pathName === sub_menu.link ? "w-full text-blue-500 font-bold pl-2 h-9 flex items-center rounded bg-blue-50" : "w-full text-gray-500 pl-2 h-9 flex items-center rounded hover:bg-gray-100 hover:text-gray-800"}
                >
                  {sub_menu.name}
                </Link>
              </div>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;