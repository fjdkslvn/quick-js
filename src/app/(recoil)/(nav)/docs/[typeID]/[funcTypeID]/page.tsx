'use client'

import Link from "next/link";
import { RightArrow } from "@public/svgs";
import FunctionBlock from '@/components/functionBlock';
import DataInput from "@/components/dataInput";
import PageNav from '@/components/pageNav';
import { useRecoilState, RecoilState } from 'recoil';
import { dataSelector } from '@/recoil/funcDataAtom';
import { functionData } from '@/constants/fucntionData';
import { sideMenuData } from '@/recoil/sideMenuAtom';
import { PageNav as PageNavType, PageNavData } from '@/recoil/pageNavAtom';
import { useEffect, useState } from 'react';
import { SideMenu, Docs } from "sideMenuType";
import { extractDocsData } from "@/utils/sideMenuData";

export default function Page({ params }: { params: { typeID: string, funcTypeID: string } }) {
  const [sideToDocs, setSideToDocs] = useRecoilState<SideMenu[]>(sideMenuData);
  const [pageNavData, setPageNavData] = useRecoilState<PageNavType>(PageNavData);
  const [docs, setDocs] = useState<Docs[] | null>(null);
  const [resultList, setResultList] = useState<string[]>([]);
  const selectedData = dataSelector[params.typeID as keyof typeof dataSelector] as RecoilState<string>; // 타입 명시
  const [data, setData] = useRecoilState<string>(selectedData); // 제네릭 타입 명시


  useEffect(() => {
    if(sideToDocs){
      const { data: docsData, menuIndex, subMenuIndex } = extractDocsData(sideToDocs, params.typeID, params.funcTypeID);
      if(menuIndex !== -1 && subMenuIndex !== -1){
        /* 페이지 네비 데이터 세팅 */
        const beforePageData = subMenuIndex === 0 ? sideToDocs[menuIndex] : sideToDocs[menuIndex].side_submenu[subMenuIndex-1];
        const afterPageData = sideToDocs[menuIndex].side_submenu.length-1 === subMenuIndex
                                ? sideToDocs.length-1 !== menuIndex ? sideToDocs[menuIndex+1] : null
                                : sideToDocs[menuIndex].side_submenu[subMenuIndex+1];
        setPageNavData({
          beforeLink : beforePageData.link,
          beforeName : beforePageData.name,
          afterLink : afterPageData ? afterPageData.link : '',
          afterName : afterPageData ? afterPageData.name : ''
        });
        
        setDocs(docsData);
      }
    }
  },[sideToDocs]);

  useEffect(() => {
    if(docs){
      scrollToHash();
      createResult(); // 기본 결과값 채우기
    }
  }, [docs]);

  const scrollToHash = () => {
    if(window.location.hash){
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(`${hash}`);
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
      }
    }
  }

  const createResult = () => {
    if(docs && data){
      let newResultList: string[] = [];
      docs.map((docsInfo:Docs) => {
        const useData = params.typeID === 'string' ? data : eval('(' + data + ')');
        const resultData = functionData[`func${docsInfo.id}`](useData);
        newResultList.push(JSON.stringify(resultData));
      });
      setResultList(newResultList);
    }
  }

  return (
    <div className="w-full px-8 py-6 md:px-12">
      <div className="text-sm mb-8 flex flex-row w-full items-end text-gray-600 dark:text-gray-300">
        <Link
          href={`/docs/${params.typeID}`}
          className={"text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}
        >
          {params.typeID}
        </Link>
        <RightArrow/>
        <p>{params.funcTypeID}</p>
      </div>
      <DataInput dataType={params.typeID as any} />
      <button className="block text-base mx-auto my-1 bg-blue-200 px-10 w-full h-12 rounded-lg text-gray-700 hover:bg-blue-300" onClick={createResult}>실행</button>
      <div>
        {docs?.map((docsItem, idx) => (
          <FunctionBlock key={docsItem.id} id={docsItem.id} title={docsItem.title} description={docsItem.description} displayCode={docsItem.display_code} result={resultList[idx]}/>
        ))}
      </div>
      <PageNav/>
    </div>
  );
}
  