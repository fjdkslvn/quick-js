'use client'

import { Notice } from "@/services/notice";
import { formatDateDot } from "@/utils/formatDate";

const Card: React.FC<{notice:Notice}> = ({notice}) => {
  return (
    <div className="w-full border-t pt-8">
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

export default Card;