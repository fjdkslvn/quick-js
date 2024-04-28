'use client'

import Notice from '@/components/notice';
import { getNoticeList } from '@/services/notice';
import { useQuery } from 'react-query';

export default function Page() {

  const fetchNoticeList = async () => {
    try {
      const data = await getNoticeList();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch notice list');
    }
  };

  const { data: noticeList } = useQuery(`noticeList`, fetchNoticeList);

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-screen-md px-4 py-8">
        <h1 className="text-3xl font-bold mb-10">공지사항</h1>
        <div>최신 업데이트 소식 및 </div>
        {noticeList?.map((notice)=>(
          <Notice key={notice.id} notice={notice}/>
        ))}
      </div>
    </div>
  );
}