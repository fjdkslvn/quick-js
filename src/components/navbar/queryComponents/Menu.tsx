'use client'

import { useQuery } from 'react-query';
import { getMenuData } from "@/services/sideMenu";

const Menu: React.FC<{ name: string }> = ({name}) => {

  const fetchMenuData = async (name: string) => {
    try {
      const menuData = await getMenuData(name);
      return menuData;
    } catch (error) {
      throw new Error('Failed to fetch menu data in /docs/[typeID]');
    }
  };

  useQuery(`menu_${name}`, () => fetchMenuData(name));
  
  return (<></>);
};

export default Menu;