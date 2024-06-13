'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Docs, SideMenu } from "sideMenuType";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FavoritesAccordion from "./favoritesAccordion";
import { useRecoilState } from "recoil";
import { sideMenuData } from "@/recoil/sideMenuAtom";
import { extractDocsData } from "@/utils/sideMenuData";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ScrollNav: React.FC = () => {
  const [sideToDocs, setSideToDocs] = useRecoilState<SideMenu[]>(sideMenuData);
  const [scrollList, setScrollList] = useState<Docs[]|[]>([]);
  const [toggle, setToggle] = useState(false);
  const pathName = usePathname();

  useEffect(()=>{
    const pathSplit = pathName.split('/');
    if(pathSplit.length >= 3){
      const { data: docsData } = extractDocsData(sideToDocs, pathSplit[2], pathSplit[3]);
      setScrollList(docsData);
    }
  },[sideToDocs, pathName]);

  useEffect(()=>{
    setToggle(false);
  },[pathName]);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <div className="h-full">
      <div className="text-sm border-solid border-b border-zinc-200 dark:border-zinc-700 cursor-pointer flex justify-between items-center px-4 py-3 md:hidden" onClick={toggleMenu}>
        <p className="text-gray-600 dark:text-gray-300">빠른 이동</p>
        {toggle ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
      </div>
      <div className={["border-solid border-zinc-200 dark:border-zinc-700 overflow-auto transition-max-height duration-500", toggle ? 'max-h-screen border-b md:border-hidden' : 'max-h-0 md:max-h-screen',"min-w-56 sticky top-16"].join(' ')}>
        <div className="min-w-56 px-4 py-6">
          <FavoritesAccordion/>
          <div className="w-full h-px bg-zinc-200 my-4 dark:bg-zinc-700"></div>
          {scrollList.length > 0 &&
            <>
              <div className="text-sm font-semibold mb-4">현재 페이지</div>
              {scrollList.map((scrollInfo) => (
                <div className="pb-2" key={`scrollTitle_${scrollInfo.id}`}>
                  <a className="text-xs font-semibold cursor-pointer hover:text-blue-500 dark:hover:text-blue-500" href={`#docs${scrollInfo.id}`}>{scrollInfo.title}</a>
                </div>
              ))}
              <div className="w-full h-px bg-zinc-200 my-4 dark:bg-zinc-700"></div>
            </>
          }
          <Link className="text-sm flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" target="_blank" href="https://github.com/fjdkslvn/quick-js/issues/new">
            질문 및 피드백 제안 <QuestionAnswerIcon className="text-sm ml-2"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScrollNav;