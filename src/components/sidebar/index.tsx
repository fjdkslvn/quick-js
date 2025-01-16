'use client'

import Link from "next/link";
import { useRecoilState } from 'recoil';
import { sideMenuData } from '@/recoil/sideMenuAtom';
import { SideMenu } from 'sideMenuType';
import { usePathname } from "next/navigation";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import { RightArrow } from "@public/svgs";

const Sidebar: React.FC = () => {
  const [sideMenu, setSideMenu] = useRecoilState<SideMenu[]>(sideMenuData);
  const [toggle, setToggle] = useState(false);
  const [pathNameList, setPathNameList] = useState<string[]>([]);
  const pathName = usePathname();

  useEffect(()=>{
    setToggle(false);
    setPathNameList(pathName.split('/'));
  },[pathName]);

  useEffect(() => {
    const handleHashLisner = () => {
      setToggle(false);
    }

    // 해시 변경 이벤트 감지
    window.addEventListener('hashchange', handleHashLisner);

    return () => {
      window.removeEventListener('hashchange', handleHashLisner);
    };
  }, []);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="h-full">
      {/* 모바일 화면 토글 */}
      <div className="border-solid border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-backDarkColor cursor-pointer flex justify-between items-center px-4 py-3 md:hidden" onClick={toggleMenu}>
        {pathNameList.length > 3
        ? <div className="flex text-sm w-full items-end text-gray-600 dark:text-gray-300">
            <p>{pathNameList[2]}</p>
            <RightArrow className="mx-1"/>
            <p>{pathNameList[3]}</p>
          </div>
        : <div className="text-sm w-full items-end text-gray-600 dark:text-gray-300">
            <p>{pathNameList[2]}</p>
          </div>}
        {toggle ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
      </div>
      <nav className={["border-solid border-zinc-200 dark:border-zinc-700 overflow-auto transition-max-height duration-500", toggle ? 'max-h-screen border-b md:border-hidden' : 'max-h-0 md:max-h-remaining',"min-w-56 sticky top-16"].join(' ')}>
        <div className="px-6 py-4 max-h-[20rem] overflow-auto md:max-h-none md:overflow-hidden bg-white dark:bg-backDarkColor">
          {sideMenu?.map((menu) => (
            <div className="text-sm" key={`menu_${menu.id}`}>
              <Link
                href={menu.link}
                onClick={handleLinkClick}
                className={pathName === menu.link
                            ? "text-blue-500 font-bold px-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
                            : "text-gray-600 px-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-neutral-800"}
              >
                {menu.name}
              </Link>
              <div>
                {menu.side_submenu.map((sub_menu) => (
                    <div className="flex flex-row w-full items-center" key={`sub_menu_${sub_menu.id}`}>
                      <div className="w-px h-10 mx-3 bg-gray-300 dark:bg-gray-600"></div>
                      <Link
                        href={sub_menu.link}
                        onClick={handleLinkClick}
                        className={pathName === sub_menu.link
                                    ? "w-full text-blue-500 font-bold px-2 h-9 flex items-center rounded my-0.5"
                                    : "w-full text-gray-600 px-2 h-9 flex items-center rounded my-0.5 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-neutral-800"}
                      >
                        {sub_menu.name}
                      </Link>
                    </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;