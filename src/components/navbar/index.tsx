'use client'
import Link from "next/link";
import { useEffect, useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import ThemeSeletor from "../themeSeletor";
import { useRecoilState } from 'recoil';
import { sideMenuData } from '@/recoil/sideMenuAtom';
import { SideMenu } from 'sideMenuType';
import { useSession, signIn, signOut } from "next-auth/react"

const Navbar: React.FC<{ sideMenuList:SideMenu[] }> = ({ sideMenuList }) => {
  const { data: session } = useSession();
  const [sideMenu, setSideMenu] = useRecoilState<SideMenu[]>(sideMenuData);
  const [toggle, setToggle] = useState(false);
  
  useEffect(() => {
    setSideMenu(sideMenuList);
  },[]);

  useEffect(() => {
    console.log(session?.user?.id);
    console.log(session?.user?.name);
    console.log(session?.user?.email);
  },[session])
  
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = 'hidden'; // 스크롤 막기
    } else {
      document.body.style.overflow = 'auto'; // 스크롤 허용
    }
  }, [toggle]);

  const handleToggle = () => {
    setToggle(!toggle);
  }

  return (
    <div className="border-b border-zinc-200 grid place-items-center sticky top-0 z-10 backdrop-filter-blur-8 bg-white bg-opacity-85 dark:bg-opacity-85 dark:bg-backDarkColor dark:border-zinc-700">
      <nav className="flex flex-row items-center max-w-screen-xl w-full h-16">
        <Link className="ml-6 mr-10 text-lg font-medium" href="/">QuickJS</Link>
        <div className="hidden mr-auto md:block">
          <Link className="mr-6 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500" href="/docs/string">문서</Link>
          <Link className="mr-6 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500" href="/notice">공지사항</Link>
        </div>
        {session
        ?<>
          <div className="ml-auto mr-2 text-xs">{`${session.user?.name}님`}</div>
          <div className="cursor-pointer mr-6 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500" onClick={() => signOut()}>로그아웃</div>
        </>
        :<div className="ml-auto cursor-pointer mr-6 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500" onClick={() => signIn()}>로그인</div>}
        <ThemeSeletor/>
        <Link className="mr-6" href="https://github.com/fjdkslvn/quick-js" target="_blank"><GitHubIcon/></Link>
        <div className="visible-mobile">
          {toggle
          ? <CloseRoundedIcon className="mr-6 cursor-pointer" onClick={handleToggle}/>
          : <MenuRoundedIcon className="mr-6 cursor-pointer" onClick={handleToggle}/>}
        </div>
      </nav>
      {toggle &&
        <div className="block fixed top-16 px-4 pb-24 bg-backColor border-t border-zinc-200 w-full h-screen md:hidden dark:bg-backDarkColor dark:border-zinc-700">
          <div>
            <Link className="text-sm text-gray-500 pl-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800" href="/docs/string" onClick={handleToggle}>문서</Link>
          </div>
          <div>
            <Link className="text-sm text-gray-500 pl-2 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800" href="/notice" onClick={handleToggle}>공지사항</Link>
          </div>
        </div>}
    </div>
  );
};

export default Navbar;