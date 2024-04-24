'use client'
import { useQuery } from 'react-query';
import Card from '@/components/card';
import ScrollNav from '@/components/scrollNav';
import { getMenuData } from '@/services/sideMenu';

export default function Page({ params }: { params: { typeID: string } }) {

  const fetchData = async () => {
    try {
      const menuData = await getMenuData(params.typeID);
      return menuData;
    } catch (error) {
      throw new Error('Failed to fetch menu data in /docs/[typeID]');
    }
  };

  const { data: menu, isLoading, isError } = useQuery(`menu_${params.typeID}`, fetchData);

  return (
    <div className="flex flex-row w-full">
      <div className="w-full mx-16 my-6">
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
