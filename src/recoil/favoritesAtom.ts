import { atom } from "recoil";
import { Docs, SideSubMenu } from 'sideMenuType';

export interface Favorites{
  user_id: string;
  docs_id: number;
  docs: DocsWithLink;
}

export interface DocsWithLink extends Docs {
  side_submenu?: SideSubMenu;
  link?: string;
}

export const favoritesIDData = atom<number[]>({
  key: "favoritesIDData",
  default: [],
});

export const favoritesDocsData = atom<DocsWithLink[]>({
  key: "favoritesDocsData",
  default: [],
});

