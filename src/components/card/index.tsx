'use client'

import Link from "next/link";

const Card: React.FC<{link:string, title:string, description: string}> = ({link, title, description}) => {

  return (
    <Link href={link}>
      <div className="text-gray-800 dark:text-gray-200 transition duration-300 ease-in-out p-4 min-h-40 rounded-2xl shadow-md border border-zinc-200 hover:border-zinc-500 dark:border-zinc-600 dark:hover:border-zinc-300">
        <div className="mb-3 text-lg font-medium">{title}</div>
        <div className="text-sm">{description}</div>
      </div>
    </Link>
  );
};

export default Card;