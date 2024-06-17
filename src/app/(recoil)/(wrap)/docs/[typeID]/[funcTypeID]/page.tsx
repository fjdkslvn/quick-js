'use client'

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
    if (docs && data) {
      let newResultList: string[] = [];
      docs.map((docsInfo: Docs) => {
        try {
          const useData = params.typeID === 'string' ? data : eval('(' + data + ')');
          const resultData = functionData[`func${docsInfo.id}`](useData);
          newResultList.push(JSON.stringify(resultData));
        } catch (error: any) {
          // 에러 발생 시 에러 메시지를 문자열로 추가
          newResultList.push(`error : ${JSON.stringify(error.message).slice(1,-1)}`);
        }
      });
      setResultList(newResultList);
    }
  }  


  return (
    <>
      <DataInput dataType={params.typeID as any} />
      <button className="block text-base mx-auto my-1 bg-blue-200 px-10 w-full h-12 rounded-lg text-gray-700 hover:bg-blue-300" onClick={createResult}>실행</button>
      <div>
        {docs?.map((docsItem, idx) => (
          <FunctionBlock key={docsItem.id} id={docsItem.id} title={docsItem.title} favoritesTitle={docsItem.favorites_title} description={docsItem.description} result={resultList[idx]}/>
        ))}
      </div>
      <PageNav/>
    </>
  );
}
  