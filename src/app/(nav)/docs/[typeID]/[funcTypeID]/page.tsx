'use client'

import Link from "next/link";
import { RightArrow } from "@public/svgs";
import FunctionBlock from '@/components/functionBlock';
import DataInput from "@/components/dataInput";
import ScrollNav from "@/components/scrollNav";
import { useEffect, useState } from 'react';
import { useFetchSideMenu } from '@/hooks/useFetchSideMenu';
import { docs } from '@prisma/client';

export default function Page({ params }: { params: { typeID: string, funcTypeID: string } }) {
  
  const { data: sideToDocs } = useFetchSideMenu();
  const [docs, setDocs] = useState<docs[] | null>(null);

  useEffect(() => {
    if(sideToDocs){
      const typeIndex = sideToDocs.findIndex(sideInfo => sideInfo.name === params.typeID);
      if(typeIndex !== -1 && sideToDocs[typeIndex]?.side_submenu){
        const funcTypeIndex = sideToDocs[typeIndex].side_submenu.findIndex(subInfo => subInfo.name === params.funcTypeID);
        if(funcTypeIndex !== -1){
          setDocs(sideToDocs[typeIndex].side_submenu[funcTypeIndex].docs);
        }
      }
    }
  },[sideToDocs]);

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
  