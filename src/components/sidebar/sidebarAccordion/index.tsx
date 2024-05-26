'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { SideMenu } from 'sideMenuType';
// import { useEffect, useState } from "react";
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SidebarAccordion: React.FC<{menu:SideMenu}> = ({menu}) => {
  // const [toggle, setToggle] = useState(false);
  const pathName = usePathname();

  // 대메뉴를 토글하는 함수
  // const toggleMenu = () => {
  //   if(pathName.includes('/docs/')){
  //     const target = pathName.split('/')[2];
  //     if(menu.link === pathName && menu.name === target){
  //       setToggle(!toggle);
  //     }
  //   }
  // };
  
  // useEffect(() => {
  //   if(pathName.includes('/docs/')){
  //     const target = pathName.split('/')[2];
  //     if(menu.name === target){
  //       setToggle(true);
  //     }
  //   }
  // },[menu, pathName]);

  return (
    <div className="text-sm">
      <Link
        // onClick={toggleMenu}
        href={menu.link}
        className={pathName === menu.link
                    ? "flex justify-between text-blue-500 font-bold px-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
                    : "flex justify-between text-gray-500 px-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
      >
        {menu.name}
        {/* {toggle
        ?<KeyboardArrowDownIcon/>
        :<KeyboardArrowRightIcon/>} */}
      </Link>
      {/* <div className={`overflow-hidden transition-max-height transition-height duration-500 ${toggle ? 'max-h-96' : 'max-h-0'}`}> */}
      <div className={'overflow-hidden transition-max-height transition-height duration-500 max-h-96'}>
        {menu.side_submenu.map((sub_menu) => (
            <div className="flex flex-row w-full items-center" key={`sub_menu_${sub_menu.id}`}>
              <div className="w-px h-10 mx-3 bg-gray-300 dark:bg-gray-600"></div>
              <Link
                href={sub_menu.link}
                className={pathName === sub_menu.link
                            ? "w-full text-blue-500 font-bold px-2 h-9 flex items-center rounded my-0.5"
                            : "w-full text-gray-500 px-2 h-9 flex items-center rounded my-0.5 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
              >
                {sub_menu.name}
              </Link>
            </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarAccordion;