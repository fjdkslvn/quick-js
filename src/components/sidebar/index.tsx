'use client'

import { useSession } from "next-auth/react"
import { useRecoilState } from 'recoil';
import { sideMenuData } from '@/recoil/sideMenuAtom';
import { SideMenu } from 'sideMenuType';
import SidebarAccordion from "./sidebarAccordion";
import FavoritesAccordion from "./favoritesAccordion";

const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const [sideMenu, setSideMenu] = useRecoilState<SideMenu[]>(sideMenuData);

  return (
    <nav className="min-w-56 px-6 py-4 h-max sticky top-16 hidden md:block">
      {session && <FavoritesAccordion/>}
      {sideMenu?.map((menu) => (
        <SidebarAccordion key={`menu_${menu.id}`} menu={menu}/>
      ))}
    </nav>
  );
};

export default Sidebar;