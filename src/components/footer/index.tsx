'use client'

import Link from "next/link";
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
  return (
    <footer className="relative bottom-0 z-10 md:sticky w-full h-16 flex justify-center border-solid border-t border-zinc-200 dark:border-zinc-700 p-6 text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-backDarkColor">
      <div className="w-full max-w-screen-xl flex justify-between items-center">
        <div>
          <p>&copy; 2024 fjdkslvn. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <Link href="https://github.com/fjdkslvn/quick-js" target="_blank"><GitHubIcon/></Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;