'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { User, userData } from "@/recoil/userAtom";
import { useRecoilState } from "recoil";
import { favoritesIDData, favoritesDocsData, DocsWithLink } from '@/recoil/favoritesAtom';
import { setFavoritesData } from "@/utils/favoritesData";
import { SideMenu } from 'sideMenuType';
import { sideMenuData } from '@/recoil/sideMenuAtom';
import { usePathname } from "next/navigation";
import StarRateIcon from '@mui/icons-material/StarRate';
import Image from "next/image";
import { updateHash } from "@/utils/navigationUtils";

const FavoritesAccordion: React.FC = () => {
  const [user, setUser] = useRecoilState<User>(userData);
  const [loadState, setLoadState] = useState(false);
  const [sideMenu, setSideMenu] = useRecoilState<SideMenu[]>(sideMenuData);
  const [faoritesIDList, setFaoritesIDList] = useRecoilState(favoritesIDData);
  const [favoritesDocsList, setFavoritesDocsList] = useRecoilState(favoritesDocsData);
  const [isMobile, setIsMobile] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const isMobileState = window.innerWidth < 768;
      setIsMobile(isMobileState);
    };

    handleResize();

    // 화면 리사이즈 감지
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(user && user.user_id){
      setLoadState(true);
      getFavoritesList();
    }
  },[user]);

  useEffect(() => {
    setLoadState(false);
  },[favoritesDocsList]);

  const getFavoritesList = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites?user_id=${user.user_id}`, { cache: 'no-store' });
    const { status, data } = await resp.json();
    if(status === 200 && data){
      const [docsIdList, docsList]: [number[], DocsWithLink[]] = setFavoritesData(data,sideMenu);
      setFaoritesIDList(docsIdList);
      setFavoritesDocsList(docsList);
    } else{
      setLoadState(false);
    }
  }

  return (
    <div className="text-sm">
      <div className={"flex items-center text-sm font-semibold mb-5"}>
        즐겨찾기
        <StarRateIcon className="text-base ml-2 text-yellow-400"/>
      </div>
      <div>
        {(user && user.user_id)
          ? loadState
            ? <div className="flex justify-center">
                <Image className="animate-spin" alt="로딩바" src="/images/icons/loading.png" width={36} height={36}/>
              </div>
            : (favoritesDocsList && favoritesDocsList.length > 0)
              ? favoritesDocsList.map((docs) => (
                  <div className="pb-3" key={`favories_${docs.id}`}>
                    {isMobile
                    ?pathName === docs.link
                      ?<div
                        onClick={() => updateHash(`#docs${docs.id}`)}
                        className={"block text-xs font-semibold cursor-pointer hover:text-blue-500 dark:hover:text-blue-500"}
                      >
                        {docs.favorites_title ? docs.favorites_title : docs.title}
                      </div>
                      :<Link
                        href={`${docs.link}`}
                        onClick={() => updateHash(`#docs${docs.id}`)}
                        className={"block text-xs font-semibold cursor-pointer hover:text-blue-500 dark:hover:text-blue-500"}
                      >
                        {docs.favorites_title ? docs.favorites_title : docs.title}
                      </Link>
                    :pathName === docs.link
                      ?<a
                        href={`#docs${docs.id}`}
                        className={"block text-xs font-semibold cursor-pointer hover:text-blue-500 dark:hover:text-blue-500"}
                      >
                        {docs.favorites_title ? docs.favorites_title : docs.title}
                      </a>
                      :<Link
                        href={`${docs.link}#docs${docs.id}`}
                        className={"block text-xs font-semibold cursor-pointer hover:text-blue-500 dark:hover:text-blue-500"}
                      >
                        {docs.favorites_title ? docs.favorites_title : docs.title}
                      </Link>}
                  </div>))
              : <div className={"text-xs font-semibold text-gray-500 dark:text-gray-400"}>즐겨찾기하는 문서가 없습니다</div>
          : <div className={"text-xs font-semibold text-gray-500 dark:text-gray-400"}>로그인 후 즐겨찾기 하세요!</div>
        }
      </div>
    </div>
  );
};

export default FavoritesAccordion;