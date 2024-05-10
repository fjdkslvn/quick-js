import { useQuery } from 'react-query';

interface SideMenu {
  id: number;
  name: string;
  description: string;
  link: string;
  side_submenu: SideSubMenu[]; // 사이드 서브메뉴를 포함
}

interface SideSubMenu {
  id: number;
  side_menu_id: number;
  name: string;
  description: string;
  link: string;
  docs: Docs[]; // 문서를 포함
}

interface Docs {
  id: number;
  side_submenu_id: number;
  title: string;
  description: string;
  display_code: string;
}

export const useFetchSideMenu = () => {
  return useQuery<SideMenu[], Error>(["sideToDocs"], async () => {
    const response = await fetch('/api/sideMenu');
    if (!response.ok) {
      throw new Error('Failed to fetch side menu');
    }
    const data = await response.json();
    return data as SideMenu[];
  }, {
    staleTime: 600000,
    cacheTime: 600000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false
  });
};
