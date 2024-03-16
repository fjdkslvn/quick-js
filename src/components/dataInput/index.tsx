'use client'

import { useRecoilState } from 'recoil';
import { dataState } from '@/recoil/atom';

const DataInput: React.FC = () => {
  const [data, setData] = useRecoilState(dataState);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  }

  return (
    <>
      <textarea className="w-full min-h-24 px-3 py-2 text-sm" value={data} maxLength={1000} placeholder={'데이터를 넣어주세요.'} onChange={handleChange}/>
    </>
  );
};

export default DataInput;