'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { SideMenu, sideMenuData } from '@/recoil/atom';

const Sidebar: React.FC = () => {
  const [sideMenu, setSideMenu] = useRecoilState<SideMenu[]>(sideMenuData);
  const pathName = usePathname();

  return (
    <nav className="min-w-56 px-6 py-4 h-max sticky top-16 hidden md:block">
      {sideMenu?.map((menu) => (
        <div key={`menu_${menu.id}`} className="text-sm">
          <Link
            href={menu.link}
            className={pathName === menu.link
                        ? "text-blue-500 font-bold pl-2 h-9 my-1 flex items-center rounded"
                        : "text-gray-500 pl-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
          >
            {menu.name}
          </Link>
          {menu.side_submenu.map((sub_menu) => (
              <div className="flex flex-row w-full items-center" key={`sub_menu_${sub_menu.id}`}>
                <div className="w-px h-10 mx-3 bg-gray-300 dark:bg-gray-600"></div>
                <Link
                  href={sub_menu.link}
                  className={pathName === sub_menu.link
                              ? "w-full text-blue-500 font-bold pl-2 h-9 flex items-center rounded my-0.5"
                              : "w-full text-gray-500 pl-2 h-9 flex items-center rounded my-0.5 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
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