import { atom } from "recoil";

export interface SideMenu {
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

export const sideMenuData = atom<SideMenu[]>({
  key: "sideMenuData",
  default: [],
});