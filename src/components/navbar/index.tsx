'use client'
import { useQuery } from 'react-query';
import Link from "next/link";
import { getSideMenuData } from "@/services/sideMenu";
import Menu from './queryComponents/Menu';
import Docs from './queryComponents/Docs';

const Navbar: React.FC = () => {

  const fetchSideMenu = async () => {
    try {
      const sideMenu = await getSideMenuData();
      return sideMenu;
    } catch (error) {
      throw new Error('Failed to fetch side menu data in /components/sidebar');
    }
  };
  
  const { data: sideMenu } = useQuery(`sideMenu`, fetchSideMenu);

  return (
    <div className="border-b border-inherit grid place-items-center sticky top-0 bg-white z-10">
        <nav className="flex flex-row items-center max-w-screen-xl w-full h-16">
            <Link className="ml-6 mr-auto text-lg" href="/">QuickJS</Link>
            <Link className="mr-6" href="/docs/string">작업실</Link>
            <Link className="mr-6" href="/notice">공지사항</Link>
        </nav>
        {sideMenu?.map((sideMenuInfo) => (
          <div key={`menu_${sideMenuInfo.id}`}>
            <Menu name={sideMenuInfo.name}/>
            {sideMenuInfo.sub_menus?.map((subMenuInfo) => (
              <Docs key={`subMenu_${subMenuInfo.id}`} name={subMenuInfo.name}/>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Navbar;