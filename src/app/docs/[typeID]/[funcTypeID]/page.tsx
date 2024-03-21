'use client'

import FunctionBlock from '@/components/functionBlock';
import { getDocsData, Docs } from '@/services/docs';
import { useEffect, useState } from 'react';

const defaultDocs: Docs = {
  id: 0,
  title: "",
  description: "",
  display_code: "",
};

export default function FunctionPage({ params }: { params: { typeID: number, funcTypeID: number } }) {
  const [docs, setDocs] = useState<Docs[]>([defaultDocs]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const docsData = await getDocsData(params.funcTypeID);
      setDocs(docsData);
    } catch (error) {
      throw new Error('Failed to fetch docs data in /docs/[typeID]/[funcTypeID]');
    }
  };

  return (
    <>
      <div>
      {docs.map((docsItem) => (
        <FunctionBlock key={docsItem.id} id={docsItem.id} title={docsItem.title} description={docsItem.description} displayCode={docsItem.display_code}/>
      ))}
    </div>
    </>
  );
}
  