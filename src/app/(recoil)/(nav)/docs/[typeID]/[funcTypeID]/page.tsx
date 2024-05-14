'use client'

import Link from "next/link";
import { RightArrow } from "@public/svgs";
import FunctionBlock from '@/components/functionBlock';
import DataInput from "@/components/dataInput";
import ScrollNav from "@/components/scrollNav";
import PageNav from '@/components/pageNav';
import { useRecoilState, RecoilState } from 'recoil';
import { dataSelector } from '@/recoil/funcDataAtom';
import { functionData } from '@/constants/fucntionData';
import { SideMenu, sideMenuData } from '@/recoil/sideMenuAtom';
import { PageNav as PageNavType, PageNavData } from '@/recoil/pageNavAtom';
import { useEffect, useState } from 'react';

import { docs } from '@prisma/client';

export default function Page({ params }: { params: { typeID: string, funcTypeID: string } }) {
  
  const [sideToDocs, setSideToDocs] = useRecoilState<SideMenu[]>(sideMenuData);
  const [pageNavData, setPageNavData] = useRecoilState<PageNavType>(PageNavData);
  const [docs, setDocs] = useState<docs[] | null>(null);
  const [resultList, setResultList] = useState<string[]>([]);
  const selectedData = dataSelector[params.typeID as keyof typeof dataSelector] as RecoilState<string>; // 타입 명시
  const [data, setData] = useRecoilState<string>(selectedData); // 제네릭 타입 명시

  useEffect(() => {
    if(sideToDocs){
      const typeIndex = sideToDocs.findIndex(sideInfo => sideInfo.name === params.typeID);
      if(typeIndex !== -1 && sideToDocs[typeIndex]?.side_submenu){
        const funcTypeIndex = sideToDocs[typeIndex].side_submenu.findIndex(subInfo => subInfo.name === params.funcTypeID);
        if(funcTypeIndex !== -1){
          /* 페이지 네비 데이터 세팅 */
          const beforePageData = funcTypeIndex === 0 ? sideToDocs[typeIndex] : sideToDocs[typeIndex].side_submenu[funcTypeIndex-1];
          const afterPageData = sideToDocs[typeIndex].side_submenu.length-1 === funcTypeIndex
                                  ? sideToDocs.length-1 !== typeIndex ? sideToDocs[typeIndex+1] : null
                                  : sideToDocs[typeIndex].side_submenu[funcTypeIndex+1];
          setPageNavData({
            beforeLink : beforePageData.link,
            beforeName : beforePageData.name,
            afterLink : afterPageData ? afterPageData.link : '',
            afterName : afterPageData ? afterPageData.name : ''
          });
          
          setDocs(sideToDocs[typeIndex].side_submenu[funcTypeIndex].docs);
        }
      }
    }
    console.log(sideToDocs);
  },[sideToDocs]);

  useEffect(() => {
    createResult(); // 기본 결과값 채우기
  }, [docs]);

  const createResult = () => {
    if(docs && data){
      let newResultList: string[] = [];
      docs.map((docsInfo:docs) => {
        const useData = params.typeID === 'string' ? data : eval('(' + data + ')');
        const resultData = functionData[`func${docsInfo.id}`](useData);
        newResultList.push(JSON.stringify(resultData));
      });
      setResultList(newResultList);
    }
  }

  return (
    <div className="flex flex-row w-full">
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
      <ScrollNav scrollList={docs??[]}/>
    </div>
  );
}
  