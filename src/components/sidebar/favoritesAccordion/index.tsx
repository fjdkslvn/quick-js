'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil";
import { favoritesIDData, favoritesDocsData } from '@/recoil/favoritesAtom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FavoritesAccordion: React.FC = () => {
  const { data: session } = useSession();
  const [faoritesIDList, setFaoritesIDList] = useRecoilState(favoritesIDData);
  const [favoritesDocsList, setFavoritesDocsList] = useRecoilState(favoritesDocsData);
  const [toggle, setToggle] = useState(true);
  const pathName = usePathname();

  useEffect(() => {
    getFavoritesList();
  },[]);

  const getFavoritesList = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites?user_id=${session?.user?.id}`, { cache: 'no-store' });
    const { status, data } = await resp.json();
    if(status === 200 && data){
      const docsList = [];
      const docsIdList = [];

      for (const favorite of data) {
        docsIdList.push(favorite.docs_id);
        docsList.push(favorite.docs);
      }
      setFaoritesIDList(docsIdList);
      setFavoritesDocsList(docsList);
    }
  }

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <div className="text-sm">
      <div
        onClick={toggleMenu}
        className={"flex justify-between text-gray-500 pl-2 pr-1 h-9 my-1 flex items-center rounded hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
      >
        즐겨찾기
        {toggle
        ?<KeyboardArrowDownIcon/>
        :<KeyboardArrowRightIcon/>}
      </div>
      <div className={`overflow-hidden transition-max-height transition-height duration-500 ${toggle ? 'max-h-96' : 'max-h-0'}`}>
        {favoritesDocsList.map((docs) => (
            <div className="flex flex-row w-full items-center" key={`favories_${docs.id}`}>
              <div className="w-px h-10 mx-3 bg-gray-300 dark:bg-gray-600"></div>
              <Link
                href={''}
                className={"w-full text-gray-500 pl-2 h-9 flex items-center rounded my-0.5 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
              >
                {docs.title}
              </Link>
            </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesAccordion;