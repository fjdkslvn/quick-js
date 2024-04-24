'use client'

import { useQuery } from 'react-query';
import Link from "next/link";
import { RightArrow } from "@public/svgs";
import FunctionBlock from '@/components/functionBlock';
import DataInput from "@/components/dataInput";
import ScrollNav from "@/components/scrollNav";
import { getDocsData } from '@/services/docs';

export default function FunctionPage({ params }: { params: { typeID: string, funcTypeID: string } }) {
  
  const fetchData = async () => {
    try {
      const docsData = await getDocsData(params.funcTypeID);
      console.log(docsData);
      return docsData;
    } catch (error) {
      throw new Error('Failed to fetch docs data in /docs/[typeID]/[funcTypeID]');
    }
  };

  const { data: docs, isLoading, isError } = useQuery(`docs_${params.funcTypeID}`, fetchData);

  return (
    <div className="flex flex-row w-full">
      <div className="w-full mx-16 my-6">
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
  