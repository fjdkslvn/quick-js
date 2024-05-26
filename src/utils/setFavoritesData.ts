import { Favorites, DocsWithLink } from "@/recoil/favoritesAtom";

const setFavoritesData = (data: Favorites[]): [number[], DocsWithLink[]] => {
  const docsIdList: number[] = [];
  const docsList: DocsWithLink[] = [];

  if (data) {
    for (const favorite of data) {
      let docsData = favorite.docs;
      docsIdList.push(docsData.id);
      docsData.link = docsData.side_submenu?.link;
      delete docsData.side_submenu;
      docsList.push(docsData);
    }
  }

  return [docsIdList, docsList];
};

export default setFavoritesData;