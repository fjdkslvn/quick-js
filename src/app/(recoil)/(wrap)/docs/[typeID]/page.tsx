'use client'
import Card from '@/components/card';
import PageNav from '@/components/pageNav';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { sideMenuData } from '@/recoil/sideMenuAtom';
import { SideMenu } from 'sideMenuType';
import { PageNav as PageNavType, PageNavData } from '@/recoil/pageNavAtom';
import { side_menu, side_submenu } from '@prisma/client';
import { extractSubMenuData } from '@/utils/sideMenuData';

export default function Page({ params }: { params: { typeID: string } }) {

  const [sideToDocs, setSideToDocs] = useRecoilState<SideMenu[]>(sideMenuData);
  const [pageNavData, setPageNavData] = useRecoilState<PageNavType>(PageNavData);
  const [menu, setMenu] = useState<side_menu | null>(null);
  const [subMenu, setSubMenu] = useState<side_submenu[] | null>(null);

  useEffect(() => {
    if(sideToDocs){
      const { data: subMenuData, menuIndex } = extractSubMenuData(sideToDocs, params.typeID);
      if(menuIndex !== -1){
        /* 페이지 네비 데이터 세팅 */
        const beforePageData = menuIndex !== 0 ? sideToDocs[menuIndex-1].side_submenu[sideToDocs[menuIndex-1].side_submenu.length-1] : null;
        const afterPageData = sideToDocs[menuIndex].side_submenu[0];
        setPageNavData({
          beforeLink : beforePageData ? beforePageData.link : '',
          beforeName : beforePageData ? beforePageData.name : '',
          afterLink : afterPageData.link,
          afterName : afterPageData.name
        });
        
        /* 메뉴 데이터 세팅 */
        setMenu(sideToDocs[menuIndex]);
        setSubMenu(subMenuData);
      }
    }
  },[sideToDocs]);

  return (
    <>
      <div className="text-sm mb-6 text-gray-600 dark:text-gray-300">{menu?.name}</div>
      <h1 className="text-3xl font-bold mb-3">{menu?.name}</h1>
      <h2 className="mb-10">{menu?.description}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {subMenu?.map((sub_menu) => (
          <Card key={sub_menu.id} link={sub_menu.link} title={sub_menu.name} description={sub_menu.description}/>
        ))}
      </div>
      <PageNav/>
    </>
  );
}
