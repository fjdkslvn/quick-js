import { atom } from "recoil";

export interface PageNav {
  beforeLink : string;
  beforeName : string;
  afterLink : string;
  afterName : string;
}

export const PageNavData = atom<PageNav>({
  key: "PageNavData",
  default: {
    beforeLink : '',
    beforeName : '',
    afterLink : '',
    afterName : ''
  },
});