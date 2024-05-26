declare module "sideMenuType" {
  export interface SideMenu {
    id: number;
    name: string;
    description: string;
    link: string;
    side_submenu: SideSubMenu[]; // 서브메뉴를 포함
  }
  
  export interface SideSubMenu {
    id: number;
    side_menu_id: number;
    name: string;
    description: string;
    link: string;
    docs: Docs[]; // 문서를 포함
  }
  
  export interface Docs {
    id: number;
    side_submenu_id: number;
    title: string;
    description: string;
    display_code: string;
  }
}