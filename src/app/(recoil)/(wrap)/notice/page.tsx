import Notice from '@/components/notice';
import { notice } from '@prisma/client';

export default async function Page() {
  try {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/notice', { next: { revalidate: 600 } });
    
    if (!resp.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    
    const noticeList:notice[] = await resp.json();

    return (
      <div className="flex justify-center w-full">
        <div className="w-full max-w-screen-md px-4 py-8">
          <h1 className="text-3xl font-bold mb-10">공지사항</h1>
          {noticeList?.map((notice)=>(
            <Notice key={notice.id} notice={notice}/>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    // 오류 처리 로직 추가
    return <div>Failed to fetch data from the API</div>;
  }
}
