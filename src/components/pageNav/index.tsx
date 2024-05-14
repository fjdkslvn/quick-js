'use client'

import Link from "next/link";
import { useRecoilState } from 'recoil';
import { PageNav as PageNavType, PageNavData } from '@/recoil/pageNavAtom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const PageNav: React.FC = () => {
  const [pageNavData, setPageNavData] = useRecoilState<PageNavType>(PageNavData);

  return (
    <div className="flex flex-row w-full pt-10 pb-4 mt-20 border-t border-zinc-200 dark:border-zinc-700">
      <Link
        href={pageNavData.beforeLink}
        className={pageNavData.beforeLink ? "text-lg text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 flex items-end" : "hidden"}
      >
        <NavigateBeforeIcon className="mr-1"/>
        {pageNavData.beforeName}
      </Link>
      <Link
        href={pageNavData.afterLink}
        className={pageNavData.afterLink ? "ml-auto text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-lg flex items-end" : "hidden"}
      >
        {pageNavData.afterName}
        <NavigateNextIcon className="ml-1"/>
      </Link>
    </div>
  );
};

export default PageNav;