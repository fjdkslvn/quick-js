'use client'
import { useRecoilState } from 'recoil';
import { favoritesDocsData, favoritesIDData, DocsWithLink } from '@/recoil/favoritesAtom';
import { useSession } from "next-auth/react"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useEffect, useState } from 'react';
import { setFavoritesData } from '@/utils/favoritesData';
import Toast from '@/components/functionBlock/toast';

const Favorites: React.FC<{docsID:number}> = ({docsID}) => {
  const { data: session } = useSession();
  const [favoritesActive, setFavoritesActive] = useState(false);
  const [faoritesIDList, setFaoritesIDList] = useRecoilState(favoritesIDData);
  const [favoritesDocsList, setFavoritesDocsList] = useRecoilState(favoritesDocsData);
  const [showToast, setShowToast] = useState(false);
  const [toastErrorState, setToastErrorState] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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
    
    const { status, data, msg } = await resp.json();
    if(status === 200 && data){
      const [docsIdList, docsList]: [number[], DocsWithLink[]] = setFavoritesData(data);
      setFaoritesIDList(docsIdList);
      setFavoritesDocsList(docsList);
    } else if(status !== 200){
      setToastErrorState(true);
      setToastMessage(msg);
      setShowToast(true);
    }
  }
  const handleDeldData = async () => {
    if(session){
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/favorites?user_id=${session?.user?.id}&docs_id=${docsID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      const { status, data, msg } = await resp.json();
      if(status === 200 && data){
        const [docsIdList, docsList]: [number[], DocsWithLink[]] = setFavoritesData(data);
        setFaoritesIDList(docsIdList);
        setFavoritesDocsList(docsList);
      } else if(status !== 200){
        setToastErrorState(true);
        setToastMessage(msg);
        setShowToast(true);
      }
    }
  }

  const beforeLoginMsg = () => {
    setToastErrorState(false);
    setToastMessage("로그인 후 사용하세요!");
    setShowToast(true);
  }

  return (
    <>
      {favoritesActive
        ? <StarRateIcon className="cursor-pointer mt-px ml-2 text-yellow-400 transition-transform duration-300 hover:rotate-45 hover:text-yellow-300" onClick={session ? handleDeldData : beforeLoginMsg}/>
        : <StarBorderIcon className="cursor-pointer mt-px ml-2 text-yellow-400 transition-transform duration-300 hover:rotate-45 hover:text-yellow-300" onClick={session ? handleAddData : beforeLoginMsg}/>}
      {showToast && <Toast message={toastMessage} error={toastErrorState} onClose={() => setShowToast(false)} />}
    </>
  );
};

export default Favorites;