import { atom } from "recoil";

export const stringData = atom({
  key: "stringData",
  default: "Hello, world! How are you today?",
});

export const numberData = atom({
  key: "numberData",
  default: 150.3748,
});

export const objectData = atom({
  key: "objectData",
  default: '{id:1, name:"김철수",gender:"남",age:18}',
});

export const arrayData = atom({
  key: "arrayData",
  default: "[1,2,3,4]",
});

export const dateData = atom({
  key: "dateData",
  default: "2025-02-05",
});

type DataSelector = {
  string: typeof stringData;
  number: typeof numberData;
  object: typeof objectData;
  array: typeof arrayData;
  date: typeof dateData;
};

export const dataSelector: DataSelector = {
  string: stringData,
  number: numberData,
  object: objectData,
  array: arrayData,
  date: dateData,
};
