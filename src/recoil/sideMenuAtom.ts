import { atom } from "recoil";
import { SideMenu } from "sideMenuType";

export const sideMenuData = atom<SideMenu[]>({
  key: "sideMenuData",
  default: [],
});