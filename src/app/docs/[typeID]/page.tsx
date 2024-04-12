'use client'
import Card from '@/components/card';
import { getMenuData, MenuItem } from '@/services/sideMenu';
import { useEffect, useState } from 'react';

const defaultMenu: MenuItem = {
  id: 0,
  name: "",
  description: "",
  link: "",
  sub_menus: [],
};

export default function Page({ params }: { params: { typeID: string } }) {

  const [menu, setMenu] = useState<MenuItem>(defaultMenu);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const menuData = await getMenuData(params.typeID);
      console.log(menuData)
      setMenu(menuData);
    } catch (error) {
      throw new Error('Failed to fetch menu data in /docs/[typeID]');
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">{menu.name}</h1>
      <h2 className="mb-8">{menu.description}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {menu.sub_menus.map((sub_menu) => (
          <Card key={sub_menu.id} link={sub_menu.link} title={sub_menu.name} description={sub_menu.description}/>
        ))}
      </div>
    </>
  );
}
  