'use client'

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Docs, SideMenu } from "sideMenuType";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FavoritesAccordion from "./favoritesAccordion";
import { useRecoilState } from "recoil";
import { sideMenuData } from "@/recoil/sideMenuAtom";
import { extractDocsData } from "@/utils/sideMenuData";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { updateHash } from "@/utils/navigationUtils";

const ScrollNav: React.FC = () => {
  const [sideToDocs, setSideToDocs] = useRecoilState<SideMenu[]>(sideMenuData);
  const [scrollList, setScrollList] = useState<Docs[]|[]>([]);
  const [toggle, setToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hash, setHash] = useState('');
  const pathName = usePathname();

  const { typeID, funcTypeID } = useMemo(() => {
    const parts = pathName.split("/").filter(Boolean); // 빈 문자열 제거
    return {
      typeID: parts[1] || "",
      funcTypeID: parts[2] || "",
    };
  }, [pathName]);

  useEffect(()=>{
    const pathSplit = pathName.split('/');
    if(pathSplit.length >= 3){
      const { data: docsData } = extractDocsData(sideToDocs, pathSplit[2], pathSplit[3]);
      setScrollList(docsData);
    }
    setToggle(false);
  },[sideToDocs, pathName]);

  useEffect(() => {
    const handleResize = () => {
      const isMobileState = window.innerWidth < 768;
      setIsMobile(isMobileState);
      return isMobileState;
    };

    if(handleResize()) {
      hashScrollController();
    }

    // 화면 리사이즈 감지
    window.addEventListener('resize', handleResize);
    // 해시 변경 이벤트 감지
    window.addEventListener('hashchange', hashScrollController);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('hashchange', hashScrollController);
    };
  }, []);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const hashScrollController = () => {
    setToggle(false);

    const hash = window.location.hash;
    if(hash) {
      // 대상 요소 가져오기
      const targetElement = document.querySelector(hash);

      // 요소가 존재하지 않으면
      if (!targetElement) {
        setTimeout(() => {
          const retryElement = document.querySelector(hash);
          if (retryElement) {
            scrollToElement(retryElement);
          }
        }, 100); // 100ms 후에 다시 시도
      } else {
        scrollToElement(targetElement);
      }
    }
  }

  const scrollToElement = (element: Element) => {
    const yOffset = -100; // 스크롤 오프셋 값 (100px 위로)
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    // 스크롤 위치 조정
    window.scrollTo({
      top: y,
    });
  };

  return (
    <div className="h-full">
      <div className="text-sm border-solid border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-backDarkColor cursor-pointer flex justify-between items-center px-4 py-3 md:hidden" onClick={toggleMenu}>
        <p className="text-gray-600 dark:text-gray-300">빠른 이동</p>
        {toggle ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
      </div>
      <div className={["border-solid border-zinc-200 dark:border-zinc-700 overflow-auto transition-max-height duration-500", toggle ? 'max-h-screen border-b md:border-hidden' : 'max-h-0 md:max-h-remaining',"min-w-56 sticky top-16"].join(' ')}>
        <div className="min-w-56 px-4 py-6 bg-white dark:bg-backDarkColor">
          <FavoritesAccordion/>
          <div className="w-full h-px bg-zinc-200 my-4 dark:bg-zinc-700"></div>
          {scrollList.length > 0 &&
            <>
              <div className="text-sm font-semibold mb-5">현재 페이지</div>
              {scrollList.map((scrollInfo) => (
                isMobile
                ?<div className="pb-3" key={`scrollTitle_${scrollInfo.id}`}>
                  <div className="block text-xs font-semibold cursor-pointer hover:text-blue-500 dark:hover:text-blue-500" onClick={() => updateHash(`#${typeID}-${funcTypeID}-${scrollInfo.id}`)}>{scrollInfo.favorites_title ? scrollInfo.favorites_title : scrollInfo.title}</div>
                </div>
                :<div className="pb-3" key={`scrollTitle_${scrollInfo.id}`}>
                  <a className="block text-xs font-semibold cursor-pointer hover:text-blue-500 dark:hover:text-blue-500" href={`#${typeID}-${funcTypeID}-${scrollInfo.id}`}>{scrollInfo.favorites_title ? scrollInfo.favorites_title : scrollInfo.title}</a>
                </div>
              ))}
              <div className="w-full h-px bg-zinc-200 my-4 dark:bg-zinc-700"></div>
            </>
          }
          <Link
            className="text-sm flex items-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" target="_blank" href="https://github.com/fjdkslvn/quick-js/issues/new"
          >
            질문 및 피드백 제안 <QuestionAnswerIcon className="text-sm ml-2"/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScrollNav;