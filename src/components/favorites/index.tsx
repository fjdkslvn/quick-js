'use client'
import { useRecoilState } from 'recoil';
import { favoritesIDData, favoritesDocsData } from '@/recoil/favoritesAtom';
import { useSession } from "next-auth/react"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useEffect, useState } from 'react';

const Favorites: React.FC<{docsID:number}> = ({docsID}) => {
  const { data: session } = useSession();
  const [favoritesActive, setFavoritesActive] = useState(false);
  const [faoritesIDList, setFaoritesIDList] = useRecoilState(favoritesIDData);
  const [favoritesDocsList, setFavoritesDocsList] = useRecoilState(favoritesDocsData);

  useEffect(() => {
    if(faoritesIDList.includes(docsID)){
      setFavoritesActive(true);
    } else {
      setFavoritesActive(false);
    }
  },[docsID, faoritesIDList]);

  const handleAddData = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: session?.user?.id,
        docs_id: docsID
      }),
    });
    
    const { status, data } = await resp.json();
    if(status === 200 && data){
      const docsList = [];
      const docsIdList = [];

      for (const favorite of data) {
        docsIdList.push(favorite.docs_id);
        docsList.push(favorite.docs);
      }
      setFaoritesIDList(docsIdList);
      setFavoritesDocsList(docsList);
    }
  }
  const handleDeldData = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites?user_id=${session?.user?.id}&docs_id=${docsID}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
    });
    
    const { status, data } = await resp.json();
    if(status === 200 && data){
      const docsList = [];
      const docsIdList = [];

      for (const favorite of data) {
        docsIdList.push(favorite.docs_id);
        docsList.push(favorite.docs);
      }
      setFaoritesIDList(docsIdList);
      setFavoritesDocsList(docsList);
    }
  }

  return (
    session
    ? favoritesActive
      ? <StarRateIcon className="cursor-pointer mt-px ml-2 hover:text-yellow-400 dark:hover:text-yellow-400" onClick={handleDeldData}/>
      : <StarBorderIcon className="cursor-pointer mt-px ml-2 hover:text-yellow-400 dark:hover:text-yellow-400" onClick={handleAddData}/>
    :<></>
  );
};

export default Favorites;