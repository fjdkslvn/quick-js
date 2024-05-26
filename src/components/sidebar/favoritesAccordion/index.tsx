'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil";
import { favoritesIDData, favoritesDocsData, DocsWithLink } from '@/recoil/favoritesAtom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import setFavoritesData from "@/utils/setFavoritesData";
import { usePathname } from "next/navigation";

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
      const [docsIdList, docsList]: [number[], DocsWithLink[]] = setFavoritesData(data);
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
              <FiberManualRecordIcon className="text-xs mx-2"/>
              {pathName === docs.link
              ?<a
                href={`#docs${docs.id}`}
                className={"w-full text-gray-500 py-2 px-2 flex items-center rounded my-0.5 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
              >
                {docs.title}
              </a>
              :<Link
                href={`${docs.link}#docs${docs.id}` ?? ''}
                className={"w-full text-gray-500 py-2 px-2 flex items-center rounded my-0.5 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-800"}
              >
                {docs.title}
              </Link>}
            </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesAccordion;