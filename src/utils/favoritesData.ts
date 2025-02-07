import { DocsWithID } from "@/recoil/favoritesAtom";
import { SideMenu } from "sideMenuType";

export function setFavoritesData(
  favoritesIDList: string[],
  sideMenu: SideMenu[]
): [string[], DocsWithID[]] {
  const filteredDocs: DocsWithID[] = [];
  // 데이터 순회하며 필터링
  for (const category of sideMenu) {
    for (const submenu of category.side_submenu) {
      for (const doc of submenu.docs) {
        const docsKeyName = `${category.name}_${submenu.name}_${doc.id}`;
        if (favoritesIDList.includes(docsKeyName)) {
          // 상위 side_submenu의 link 값을 doc 객체에 추가
          const docWithLink = {
            ...doc,
            favorites_id: docsKeyName,
            type_id: category.name,
            func_type_id: submenu.name,
          };
          filteredDocs.push(docWithLink);
        }
      }
    }
  }

  return [favoritesIDList, filteredDocs];
}
