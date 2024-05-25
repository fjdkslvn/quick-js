import { atom } from "recoil";
import { docs } from '@prisma/client';

export const favoritesIDData = atom<number[]>({
  key: "favoritesIDData",
  default: [],
});
export const favoritesDocsData = atom<docs[]>({
  key: "favoritesDocsData",
  default: [],
});

