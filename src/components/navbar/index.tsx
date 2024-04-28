'use client'
import { useQuery } from 'react-query';
import Link from "next/link";
import { getSideToDocs } from "@/services/sideMenu";
import { Burger, Close } from '@public/svgs';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

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

  const fetchSideToDocs = async () => {
    try {
      const data = await getSideToDocs();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch side to docs');
    }
  };
  
  const { data: sideMenu } = useQuery(`sideToDocs`, fetchSideToDocs);
  const pathName = usePathname();

  return (
    <div className="border-b border-inherit grid place-items-center sticky top-0 bg-white z-10">
      <nav className="flex flex-row items-center max-w-screen-xl w-full h-16">
        <Link className="ml-6 mr-auto text-base" href="/">QuickJS</Link>
        <div className="hidden md:block">
          <Link className="mr-6 text-sm text-gray-600 hover:text-gray-900" href="/docs/string">작업실</Link>
          <Link className="mr-6 text-sm text-gray-600 hover:text-gray-900" href="/notice">공지사항</Link>
        </div>
        {toggle
        ? <Close className="block mr-6 w-10 h-10 p-2 cursor-pointer md:hidden" onClick={handleToggle}/>
        : <Burger className="block mr-6 w-10 h-10 p-2 cursor-pointer md:hidden" onClick={handleToggle}/>}
      </nav>
      {toggle &&
        <div className="block fixed top-20 px-4 pb-24 bg-white w-full h-screen md:hidden">
          <div>
            <Link className="text-sm text-gray-500 pl-2 h-9 mb-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800" href="/docs/string" onClick={handleToggle}>작업실</Link>
          </div>
          <div>
            <Link className="text-sm text-gray-500 pl-2 h-9 mb-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800" href="/notice" onClick={handleToggle}>공지사항</Link>
          </div>

          {sideMenu?.map((menu) => (
            <div key={`menu_${menu.id}`} className="text-sm">
              <Link
                href={menu.link}
                className={pathName === menu.link ? "text-blue-500 font-bold pl-2 h-9 my-1 flex items-center rounded bg-blue-50" : "text-gray-500 pl-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800"}
                onClick={handleToggle}
              >
                {menu.name}
              </Link>
              {menu.sub_menus.map((sub_menu) => (
                  <div className="flex flex-row w-full items-center" key={`sub_menu_${sub_menu.id}`}>
                    <div className="w-px h-10 mx-3 bg-gray-300"></div>
                    <Link
                      href={sub_menu.link}
                      className={pathName === sub_menu.link ? "w-full text-blue-500 font-bold pl-2 h-9 flex items-center rounded bg-blue-50 my-0.5" : "w-full text-gray-500 pl-2 h-9 flex items-center rounded my-0.5 hover:bg-gray-100 hover:text-gray-800"}
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