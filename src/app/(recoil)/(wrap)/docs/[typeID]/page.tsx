'use client'
import Card from '@/components/card';
import PageNav from '@/components/pageNav';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { sideMenuData } from '@/recoil/sideMenuAtom';
import { SideMenu, SideSubMenu } from 'sideMenuType';
import { PageNav as PageNavType, PageNavData } from '@/recoil/pageNavAtom';
import { extractSubMenuData } from '@/utils/sideMenuData';

export default function Page({ params }: { params: { typeID: string } }) {

  const [sideToDocs, setSideToDocs] = useRecoilState<SideMenu[]>(sideMenuData);
  const [pageNavData, setPageNavData] = useRecoilState<PageNavType>(PageNavData);
  const [menu, setMenu] = useState<SideMenu | null>(null);
  const [subMenu, setSubMenu] = useState<SideSubMenu[] | null>(null);

  useEffect(() => {
    if(sideToDocs){
      const { data: subMenuData, menuIndex } = extractSubMenuData(sideToDocs, params.typeID);
      if(menuIndex !== -1){
        setPageNavData({
          beforeLink : menuIndex !== 0 ? `/docs/${sideToDocs[menuIndex-1].name}/${sideToDocs[menuIndex-1].side_submenu[sideToDocs[menuIndex-1].side_submenu.length-1].name}` : '',
          beforeName : menuIndex !== 0 ? sideToDocs[menuIndex-1].side_submenu[sideToDocs[menuIndex-1].side_submenu.length-1].name : '',
          afterLink : `/docs/${sideToDocs[menuIndex].name}/${sideToDocs[menuIndex].side_submenu[0].name}`,
          afterName : sideToDocs[menuIndex].side_submenu[0].name
        });
        
        /* 메뉴 데이터 세팅 */
        setMenu(sideToDocs[menuIndex]);
        setSubMenu(subMenuData);
      }
    }
  },[sideToDocs]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-3">{menu?.name}</h1>
      <h2 className="mb-10">{menu?.description}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {subMenu?.map((sub_menu) => (
          <Card key={sub_menu.name} link={`/docs/${menu?.name}/${sub_menu.name}`} title={sub_menu.name} description={sub_menu.description}/>
        ))}
      </div>
      <PageNav/>
    </>
  );
}
