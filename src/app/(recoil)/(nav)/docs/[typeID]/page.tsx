'use client'
import Card from '@/components/card';
import PageNav from '@/components/pageNav';
import ScrollNav from '@/components/scrollNav';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { sideMenuData } from '@/recoil/sideMenuAtom';
import { SideMenu } from 'sideMenuType';
import { PageNav as PageNavType, PageNavData } from '@/recoil/pageNavAtom';
import { side_menu, side_submenu } from '@prisma/client';

export default function Page({ params }: { params: { typeID: string } }) {


  const [sideToDocs, setSideToDocs] = useRecoilState<SideMenu[]>(sideMenuData);
  const [pageNavData, setPageNavData] = useRecoilState<PageNavType>(PageNavData);
  const [menu, setMenu] = useState<side_menu | null>(null);
  const [subMenu, setSubMenu] = useState<side_submenu[] | null>(null);

  useEffect(() => {
    if(sideToDocs){
      const typeIndex = sideToDocs.findIndex(sideInfo => sideInfo.name === params.typeID);
      if(typeIndex !== -1){
        /* 페이지 네비 데이터 세팅 */
        const beforePageData = typeIndex !== 0 ? sideToDocs[typeIndex-1].side_submenu[sideToDocs[typeIndex-1].side_submenu.length-1] : null;
        const afterPageData = sideToDocs[typeIndex].side_submenu[0];
        setPageNavData({
          beforeLink : beforePageData ? beforePageData.link : '',
          beforeName : beforePageData ? beforePageData.name : '',
          afterLink : afterPageData.link,
          afterName : afterPageData.name
        });
        
        /* 메뉴 데이터 세팅 */
        setMenu(sideToDocs[typeIndex]);
        setSubMenu(sideToDocs[typeIndex].side_submenu);
      }
    }
  },[sideToDocs]);

  return (
    <div className="flex flex-row w-full">
      <div className="w-full px-8 py-6 md:px-12">
        <div className="text-sm mb-6 text-gray-600 dark:text-gray-300">{menu?.name}</div>
        <h1 className="text-3xl font-bold mb-3">{menu?.name}</h1>
        <h2 className="mb-10">{menu?.description}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {subMenu?.map((sub_menu) => (
            <Card key={sub_menu.id} link={sub_menu.link} title={sub_menu.name} description={sub_menu.description}/>
          ))}
        </div>
        <PageNav/>
      </div>
      <ScrollNav scrollList={[]} />
    </div>
  );
}
