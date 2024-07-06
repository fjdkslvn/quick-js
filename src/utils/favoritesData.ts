import { DocsWithLink } from "@/recoil/favoritesAtom";
import { SideMenu } from 'sideMenuType';

export function setFavoritesData (favoritesIDList: number[], sideMenu: SideMenu[]): [number[], DocsWithLink[]] {
  const docsList: DocsWithLink[] = [];

  const filteredDocs: DocsWithLink[] = [];

  // 데이터 순회하며 필터링
  for (const category of sideMenu) {
      for (const submenu of category.side_submenu) {
          for (const doc of submenu.docs) {
              if (favoritesIDList.includes(doc.id)) {
                  // 상위 side_submenu의 link 값을 doc 객체에 추가
                  const docWithLink = {
                      ...doc,
                      link: submenu.link
                  };
                  filteredDocs.push(docWithLink);
              }
          }
      }
  }

  return [favoritesIDList, filteredDocs];
};