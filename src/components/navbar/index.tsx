'use client'
import Link from "next/link";

const Navbar: React.FC = () => {

  return (
    <div className="border-b border-inherit grid place-items-center">
        <nav className="flex flex-row items-center max-w-screen-xl w-full h-16">
            <Link className="ml-6 mr-auto text-lg" href="/">QuickJS</Link>
            <Link className="mr-6" href="/docs/string">작업실</Link>
            <Link className="mr-6" href="/notice">공지사항</Link>
        </nav>
    </div>
  );
};

export default Navbar;