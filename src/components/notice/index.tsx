import { notice } from 'noticeType';

const Notice: React.FC<{ notice: notice }> = ({ notice }) => {

  return (
    <div className="w-full border-t pt-8 pb-10">
      <div className="flex flex-row">
        <div className="text-gray-600 min-w-28 mr-12 dark:text-gray-300">{notice.create_date}</div>
        <div>
          <div className="mb-6 text-2xl font-bold">{notice.title}</div>
          <div className="text-gray-600 leading-7 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: notice.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
