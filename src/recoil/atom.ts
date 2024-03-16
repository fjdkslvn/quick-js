import { atom } from "recoil";

export const dataState = atom({
  key: "data",
  default: '[{id:1, name:"김철수",gender:"남",age:18},{id:2, name:"김영희",gender:"여",age:18}]',
});