'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ThemeSeletor from "../themeSeletor";
import { useRecoilState } from 'recoil';
import { userData, User } from '@/recoil/userAtom';
import { SideMenu } from 'sideMenuType';
import { usePathname } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@/db/firebaseAuth';
import Cookies from 'js-cookie';

const Header: React.FC = () => {
  const [user, setUser] = useRecoilState<User>(userData);
  const [toggle, setToggle] = useState(false);
  const pathName = usePathname();
  
  useEffect(() => {
    const user_id = Cookies.get('quickJS-user-id');
    const user_name = Cookies.get('quickJS-user-name');

    setUser({
      user_id : user_id ?? '',
      name : user_name ?? ''
    });
  },[]);

  useEffect(() => {
    setToggle(false);
  },[pathName]);
  
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

  const mobileMovePage = (link:string) => {
    // pathName 변경시 헤더 닫아야하는데, 같은 링크일때 이동안하는 경우 처리
    if(link === pathName){
      setToggle(false);
    }
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
    .then((result) => {
      setUser({
        user_id : result.user.uid ?? '',
        name : result.user.displayName ?? ''
      });

      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (2 * 24 * 60 * 60 * 1000)); // 2일 후의 시간

      // 쿠키 설정
      Cookies.set('quickJS-user-id', result.user.uid ?? '', { expires: expirationDate });
      Cookies.set('quickJS-user-name', result.user.displayName ?? '', { expires: expirationDate });
    })
    .catch((error)=> {
    }); 
  }

  const logout = () => {
    Cookies.remove('quickJS-user-id');
    Cookies.remove('quickJS-user-name');
    
    setUser({
      user_id : '',
      name : ''
    });
  }

  return (
    <>
      <div className="z-10 border-b border-zinc-200 grid place-items-center sticky top-0 backdrop-filter-blur-8 bg-white bg-opacity-85 dark:bg-opacity-85 dark:bg-backDarkColor dark:border-zinc-700">
        <nav className="flex flex-row items-center max-w-screen-xl w-full h-16">
          <Link className="ml-6 mr-10 text-lg font-medium" href="/">
            <Image className="block dark:hidden" src="/images/logo.png" alt="로고" width="120" height="45"/>
            <Image className="hidden dark:block" src="/images/white_logo.png" alt="다크모드 로고" width="120" height="45"/>
          </Link>
          <div className="hidden mr-auto md:block">
            <Link className="mr-6 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500" href="/docs/string">문서</Link>
            <Link className="mr-6 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500" href="/notice">공지사항</Link>
          </div>
          {user && user.user_id
          ?<>
            <div className="ml-auto mr-2 text-xs">{`${user.name}님`}</div>
            <div className="cursor-pointer mr-6 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500" onClick={logout}>로그아웃</div>
          </>
          :<div className="ml-auto cursor-pointer mr-6 text-sm font-medium text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500" onClick={signInWithGoogle}>로그인</div>}
          <div className="invisible-mobile">
            <ThemeSeletor/>
          </div>
          <div className="visible-mobile">
            {toggle
            ? <CloseRoundedIcon className="mr-6 cursor-pointer" onClick={handleToggle}/>
            : <MenuRoundedIcon className="mr-6 cursor-pointer" onClick={handleToggle}/>}
          </div>
        </nav>
      </div>
      {toggle &&
        <div className="z-10 flex flex-col justify-between fixed top-16 px-4 pt-4 pb-20 bg-backColor border-t border-zinc-200 w-full h-full md:hidden dark:bg-backDarkColor dark:border-zinc-700">
          <div>
            <Link className="text-sm pl-2 h-9 my-1 flex items-center rounded text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800" href="/docs/string" onClick={() => mobileMovePage("/docs/string")}>문서</Link>
            <Link className="text-sm pl-2 h-9 my-1 flex items-center rounded text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800" href="/notice" onClick={() => mobileMovePage("/notice")}>공지사항</Link>
          </div>
          <ThemeSeletor/>
        </div>}
    </>
  );
};

export default Header;