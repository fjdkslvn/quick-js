'use client'

import Link from "next/link";
import GitHubIcon from '@mui/icons-material/GitHub';

// const Footer: React.FC = () => {
  
//   return(
//     <div className="border-solid border-t border-gray-300 p-4">
//       <div className="w-full flex justify-center">
//           <Link href="https://fjdkslvn.tistory.com/" target="_blank">티스토리</Link>
//           <Link href="https://github.com/fjdkslvn/quick-js" target="_blank"><GitHubIcon/></Link>
//       </div>
//     </div>
//   )
// };

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex justify-center border-solid border-t border-zinc-200 dark:border-zinc-700 p-6 text-xs text-gray-600 dark:text-gray-300">
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