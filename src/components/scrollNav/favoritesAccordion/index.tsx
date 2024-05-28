'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil";
import { favoritesIDData, favoritesDocsData, DocsWithLink } from '@/recoil/favoritesAtom';
import { setFavoritesData } from "@/utils/favoritesData";
import { usePathname } from "next/navigation";
import StarRateIcon from '@mui/icons-material/StarRate';
import Image from "next/image";

const FavoritesAccordion: React.FC = () => {
  const { data: session } = useSession();
  const [firstStart, setFirstStart] = useState(true);
  const [loadState, setLoadState] = useState(false);
  const [faoritesIDList, setFaoritesIDList] = useRecoilState(favoritesIDData);
  const [favoritesDocsList, setFavoritesDocsList] = useRecoilState(favoritesDocsData);
  const pathName = usePathname();

  useEffect(() => {
    if(session && firstStart){
      setLoadState(true);
      setFirstStart(false);
      getFavoritesList();
    }
  },[session]);

  useEffect(() => {
    setLoadState(false);
  },[favoritesDocsList])

  const getFavoritesList = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites?user_id=${session?.user?.id}`, { cache: 'no-store' });
    const { status, data } = await resp.json();
    if(status === 200 && data){
      const [docsIdList, docsList]: [number[], DocsWithLink[]] = setFavoritesData(data);
      setFaoritesIDList(docsIdList);
      setFavoritesDocsList(docsList);
    }
  }

  return (
    <div className="text-sm">
      <div className={"flex items-center text-sm font-semibold mb-4"}>
        즐겨찾기
        <StarRateIcon className="text-base ml-2 text-yellow-400"/>
      </div>
      <div>
        {session
          ? loadState
            ? <div className="flex justify-center">
                <Image className="animate-spin" alt="로딩바" src="/images/icons/loading.png" width={36} height={36}/>
              </div>
            : (favoritesDocsList && favoritesDocsList.length > 0)
              ? favoritesDocsList.map((docs) => (
                  <div className="pb-2" key={`favories_${docs.id}`}>
                    {pathName === docs.link
                    ?<a
                      href={`#docs${docs.id}`}
                      className={"text-xs font-semibold cursor-pointer hover:text-blue-500 dark:hover:text-blue-500"}
                    >
                      {docs.title}
                    </a>
                    :<Link
                      href={`${docs.link}#docs${docs.id}` ?? ''}
                      className={"text-xs font-semibold cursor-pointer hover:text-blue-500 dark:hover:text-blue-500"}
                    >
                      {docs.title}
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