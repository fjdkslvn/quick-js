import { Docs, SideMenu, SideSubMenu } from "sideMenuType";

interface subMenuResult {
  data:SideSubMenu[];
  menuIndex: number;
};
interface docsResult {
  data:Docs[];
  menuIndex: number;
  subMenuIndex: number;
};

export function extractSubMenuData (sideToDocs: SideMenu[], menuType:string): subMenuResult {
  let resultData:SideSubMenu[] = [];
  let menuIndex = -1;

  if(sideToDocs){
    menuIndex = sideToDocs.findIndex(sideInfo => sideInfo.name === menuType);
    if(menuIndex !== -1){
      resultData = sideToDocs[menuIndex].side_submenu;
    }
  }

  return {data:resultData, menuIndex};
};

export function extractDocsData (sideToDocs: SideMenu[], menuType:string, subMenuType:string): docsResult {
  let resultData:Docs[] = [];
  let menuIndex = -1;
  let subMenuIndex = -1;

  if(sideToDocs){
    menuIndex = sideToDocs.findIndex(sideInfo => sideInfo.name === menuType);
    if(menuIndex !== -1 && sideToDocs[menuIndex]?.side_submenu){
      subMenuIndex = sideToDocs[menuIndex].side_submenu.findIndex(subInfo => subInfo.name === subMenuType);
      if(subMenuIndex !== -1){
        resultData =sideToDocs[menuIndex].side_submenu[subMenuIndex].docs;
      }
    }
  }

  return {data:resultData, menuIndex, subMenuIndex};
};