'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSideToDocs } from '@/hooks/useSideToDocs';
import ThemeSeletor from "../themeSeletor";

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = 'hidden'; // 스크롤 막기
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 허용
    }
  }, [toggle]);
  
  const { data: sideMenu } = useSideToDocs();
  const pathName = usePathname();

  return (
    <div className="border-b border-inherit grid place-items-center sticky top-0 z-10 dark:bg-backDarkColor">
      <nav className="flex flex-row items-center max-w-screen-xl w-full h-16">
        <Link className="ml-6 mr-auto text-base" href="/">QuickJS</Link>
        <div className="hidden md:block">
          <Link className="mr-6 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100" href="/docs/string">작업실</Link>
          <Link className="mr-6 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100" href="/notice">공지사항</Link>
        </div>
        <div className="visible-mobile">
          {toggle
          ? <CloseRoundedIcon className="mr-6 cursor-pointer" onClick={handleToggle}/>
          : <MenuRoundedIcon className="mr-6 cursor-pointer" onClick={handleToggle}/>}
        </div>
        <ThemeSeletor/>
      </nav>
      {toggle &&
        <div className="block fixed top-20 px-4 pb-24 bg-backColor w-full h-screen md:hidden dark:bg-backDarkColor">
          <div>
            <Link className="text-sm text-gray-500 pl-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800" href="/docs/string" onClick={handleToggle}>작업실</Link>
          </div>
          <div>
            <Link className="text-sm text-gray-500 pl-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800" href="/notice" onClick={handleToggle}>공지사항</Link>
          </div>

          {sideMenu?.map((menu) => (
            <div key={`menu_${menu.id}`} className="text-sm">
              <Link
                href={menu.link}
                className={pathName === menu.link
                            ? "text-blue-500 font-bold pl-2 h-9 my-1 flex items-center rounded"
                            : "text-gray-500 pl-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
                onClick={handleToggle}
              >
                {menu.name}
              </Link>
              {menu.sub_menus.map((sub_menu) => (
                  <div className="flex flex-row w-full items-center" key={`sub_menu_${sub_menu.id}`}>
                    <div className="w-px h-10 mx-3 bg-gray-300 dark:bg-gray-600"></div>
                    <Link
                      href={sub_menu.link}
                      className={pathName === sub_menu.link
                                  ? "w-full text-blue-500 font-bold pl-2 h-9 flex items-center rounded my-0.5"
                                  : "w-full text-gray-500 pl-2 h-9 flex items-center rounded my-0.5 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
                      onClick={handleToggle}
                    >
                      {sub_menu.name}
                    </Link>
                  </div>
              ))}
            </div>
          ))}
        </div>}
    </div>
  );
};

export default Navbar;