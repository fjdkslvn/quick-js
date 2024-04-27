'use client'

import { useQuery } from 'react-query';
import Link from "next/link";
import { RightArrow } from "@public/svgs";
import FunctionBlock from '@/components/functionBlock';
import DataInput from "@/components/dataInput";
import ScrollNav from "@/components/scrollNav";
import { getSideToDocs, MenuItem } from "@/services/sideMenu";
import { Docs } from "@/services/docs";
import { useEffect, useState } from 'react';

export default function FunctionPage({ params }: { params: { typeID: string, funcTypeID: string } }) {
  
  const fetchSideToDocs = async () => {
    try {
      const data = await getSideToDocs();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch side to docs');
    }
  };
  
  const { data: sideToDocs } = useQuery<MenuItem[]>(`sideToDocs`, fetchSideToDocs);
  const [docs, setDocs] = useState<Docs[]>([]);

  useEffect(() => {
    if(sideToDocs){
      const typeIndex = sideToDocs.findIndex(sideInfo => sideInfo.name === params.typeID);
      if(typeIndex !== -1 && sideToDocs[typeIndex]?.sub_menus){
        const funcTypeIndex = sideToDocs[typeIndex].sub_menus.findIndex(subInfo => subInfo.name === params.funcTypeID);
        if(funcTypeIndex !== -1){
          setDocs(sideToDocs[typeIndex].sub_menus[funcTypeIndex].docs);
        }
      }
    }
  },[sideToDocs]);

  return (
    <div className="flex flex-row w-full">
      <div className="w-full px-8 py-6 md:px-12">
        <div className="text-sm mb-8 flex flex-row w-full items-end text-gray-700">
          <Link
            href={`/docs/${params.typeID}`}
            className={"text-gray-400 hover:text-gray-700"}
          >
            {params.typeID}
          </Link>
          <RightArrow/>
          <p>{params.funcTypeID}</p>
        </div>
        <DataInput dataType={params.typeID as any} />
        <div>
          {docs?.map((docsItem) => (
            <FunctionBlock dataType={params.typeID} key={docsItem.id} id={docsItem.id} title={docsItem.title} description={docsItem.description} displayCode={docsItem.display_code}/>
          ))}
        </div>
      </div>
      <ScrollNav scrollList={docs??[]}/>
    </div>
  );
}
  