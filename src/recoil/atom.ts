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

export const stringData = atom({
  key: "stringData",
  default: 'Hello, world! How are you today?',
});

export const numberData = atom({
  key: "numberData",
  default: 123,
});

export const objectData = atom({
  key: "objectData",
  default: '{id:1, name:"김철수",gender:"남",age:18}',
});

export const arrayData = atom({
  key: "arrayData",
  default: '[{id:1, name:"김철수",gender:"남",age:18},{id:2, name:"김영희",gender:"여",age:18}]',
});

export const dateData = atom({
  key: "dateData",
  default: new Date(),
});

type DataSelector = {
  string: typeof stringData;
  number : typeof numberData;
  object : typeof objectData;
  array: typeof arrayData;
  date: typeof dateData;
};

export const dataSelector: DataSelector = {
  string: stringData,
  number: numberData,
  object : objectData,
  array: arrayData,
  date : dateData,
};