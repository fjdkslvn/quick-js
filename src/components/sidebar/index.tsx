'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { SideMenu, sideMenuData } from '@/recoil/sideMenuAtom';
import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface MenuState {
  [key: string]: boolean;
}

const Sidebar: React.FC = () => {
  const [sideMenu, setSideMenu] = useRecoilState<SideMenu[]>(sideMenuData);
  const [menuState, setMenuState] = useState<MenuState>({});
  const pathName = usePathname();

  // 대메뉴를 토글하는 함수
  const toggleMenu = (id:number, link:string) => {
    setMenuState({
      ...menuState,
      [`menu_${id}`]: pathName !== link ? true : !menuState[`menu_${id}`] // 특정 메뉴 아이디의 상태를 반전시킴
    });
  };
  
  useEffect(() => {
    if(pathName.includes('/docs/')){
      const target = pathName.split('/')[2];
      const targetData = sideMenu.find(menu => menu.name === target);
      setMenuState({
        ...menuState,
        [`menu_${targetData?.id}`] : true
      });
    }
  },[sideMenu, pathName]);

  return (
    <nav className="min-w-56 px-6 py-4 h-max sticky top-16 hidden md:block">
      {sideMenu?.map((menu) => (
        <div key={`menu_${menu.id}`} className="text-sm">
          <Link
          onClick={() => toggleMenu(menu.id, menu.link)}
            href={menu.link}
            className={pathName === menu.link
                        ? "flex justify-between text-blue-500 font-bold pl-2 pr-1 h-9 my-1 flex items-center rounded"
                        : "flex justify-between text-gray-500 pl-2 pr-1 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
          >
            {menu.name}
            {menuState[`menu_${menu.id}`]
            ?<KeyboardArrowDownIcon/>
            :<KeyboardArrowRightIcon/>}
          </Link>
          <div className={`overflow-hidden transition-max-height transition-height duration-500 ${menuState[`menu_${menu.id}`] ? 'max-h-96' : 'max-h-0'}`}>
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
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;