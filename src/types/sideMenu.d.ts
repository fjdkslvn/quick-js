declare module "sideMenuType" {
  export interface SideMenu {
    name: string;
    description: string;
    side_submenu: SideSubMenu[]; // 서브메뉴를 포함
  }

  export interface SideSubMenu {
    name: string;
    description: string;
    docs: Docs[]; // 문서를 포함
  }

  export interface Docs {
    id: number;
    title?: string;
    favorites_title?: string;
    description: string;
    code_example: string;
    func_data: (data: any) => void;
  }
}
