import { formatDateDot } from "@/utils/formatDate";
import { notice } from '@prisma/client';

const Notice: React.FC<{ notice: notice }> = ({ notice }) => {
  const formattedDate = notice.create_date ? formatDateDot(notice.create_date) : ''; 

  return (
    <div className="w-full border-t pt-8 pb-10">
      <div className="flex flex-row">
        <div className="text-gray-600 mr-16 dark:text-gray-300">{formattedDate}</div>
        <div>
          <div className="mb-6 text-2xl font-bold">{notice.title}</div>
          <div className="text-gray-600 leading-7 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: notice.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
