declare module "sideMenuType" {
  export interface SideMenu {
    id: number;
    name: string;
    description: string;
    link: string;
    sort_order?: number;
    side_submenu: SideSubMenu[]; // 서브메뉴를 포함
  }
  
  export interface SideSubMenu {
    id: number;
    side_menu_id: number;
    name: string;
    description: string;
    link: string;
    sort_order?: number;
    docs: Docs[]; // 문서를 포함
  }
  
  export interface Docs {
    id: number;
    side_submenu_id: number;
    title: string;
    sort_order?: number;
    description: string;
  }
}