import { atom } from "recoil";
import { Docs, SideSubMenu } from "sideMenuType";

export interface Favorites {
  docs: DocsWithID;
}

export interface DocsWithID extends Docs {
  side_submenu?: SideSubMenu;
  favorites_id?: string;
  type_id: string;
  func_type_id: string;
}

export const favoritesIDData = atom<string[]>({
  key: "favoritesIDData",
  default: [],
});

export const favoritesDocsData = atom<DocsWithID[]>({
  key: "favoritesDocsData",
  default: [],
});
