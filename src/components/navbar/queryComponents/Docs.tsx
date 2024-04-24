'use client'

import { useQuery } from 'react-query';
import { getDocsData } from '@/services/docs';

const Menu: React.FC<{ name: string }> = ({name}) => {

  const fetchDocs = async (name: string) => {
    try {
      const docsData = await getDocsData(name);
      return docsData;
    } catch (error) {
      throw new Error('Failed to fetch docs data in /docs/[typeID]/[funcTypeID]');
    }
  };

  useQuery(`docs_${name}`, () => fetchDocs(name));
  
  return (<></>);
};

export default Menu;