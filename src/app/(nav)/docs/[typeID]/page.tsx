'use client'
import { useQuery } from 'react-query';
import Card from '@/components/card';
import ScrollNav from '@/components/scrollNav';
import { getSideToDocs, MenuItem, SubMenuItem } from '@/services/sideMenu';
import { useEffect, useState } from 'react';

export default function Page({ params }: { params: { typeID: string } }) {

  const defaultMenu: MenuItem = {
    id: 0,
    name: "",
    description: "",
    link: "",
    sub_menus: [],
  };  

  const fetchSideToDocs = async () => {
    try {
      const data = await getSideToDocs();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch side to docs');
    }
  };

  const { data: sideToDocs } = useQuery<MenuItem[]>(`sideToDocs`, fetchSideToDocs);
  const [menu, setMenu] = useState<MenuItem>(defaultMenu);

  useEffect(() => {
    if(sideToDocs){
      const typeIndex = sideToDocs.findIndex(sideInfo => sideInfo.name === params.typeID);
      if(typeIndex !== -1){
        setMenu(sideToDocs[typeIndex]);
      }
    }
  },[sideToDocs]);

  return (
    <div className="flex flex-row w-full">
      <div className="w-full px-8 py-6 md:px-12">
        <div className="text-sm mb-6 text-gray-700">{menu?.name}</div>
        <h1 className="text-3xl font-bold mb-2">{menu?.name}</h1>
        <h2 className="mb-8">{menu?.description}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {menu?.sub_menus.map((sub_menu) => (
            <Card key={sub_menu.id} link={sub_menu.link} title={sub_menu.name} description={sub_menu.description}/>
          ))}
        </div>
      </div>
      <ScrollNav scrollList={[]} />
    </div>
  );
}
