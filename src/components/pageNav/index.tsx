'use client'

import Link from "next/link";
import { useRecoilState } from 'recoil';
import { PageNav as PageNavType, PageNavData } from '@/recoil/pageNavAtom';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const PageNav: React.FC = () => {
  const [pageNavData, setPageNavData] = useRecoilState<PageNavType>(PageNavData);

  return (
    <div className="flex flex-row w-full mt-8">
      <Link
        href={pageNavData.beforeLink}
        className={pageNavData.beforeLink ? "text-xl" : "hidden"}
      >
        <NavigateBeforeIcon className="mr-1"/>
        {pageNavData.beforeName}
      </Link>
      <Link
        href={pageNavData.afterLink}
        className={pageNavData.afterLink ? "ml-auto text-xl" : "hidden"}
      >
        {pageNavData.afterName}
        <NavigateNextIcon className="ml-1"/>
      </Link>
    </div>
  );
};

export default PageNav;