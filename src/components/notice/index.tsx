'use client'

import { Notice as NoticeType} from "@/services/notice";
import { formatDateDot } from "@/utils/formatDate";

const Notice: React.FC<{notice:NoticeType}> = ({notice}) => {
  return (
    <div className="w-full border-t pt-8 pb-10">
      <div className="flex flex-row">
        <div className="text-gray-600 mr-16 dark:text-gray-300">{formatDateDot(notice.create_date)}</div>
        <div>
          <div className="mb-6 text-2xl font-bold">{notice.title}</div>
          <div className="text-gray-600 leading-7 dark:text-gray-300">{notice.content}</div>
        </div>
      </div>
    </div>
  );
};

export default Notice;