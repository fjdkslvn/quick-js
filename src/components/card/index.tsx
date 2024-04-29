'use client'

import Link from "next/link";

const Card: React.FC<{link:string, title:string, description: string}> = ({link, title, description}) => {

  return (
    <Link href={link}>
      <div className="bg-sky-100 p-4 min-h-48 rounded-2xl shadow-md hover:bg-sky-50 dark:bg-gray-600 dark:hover:bg-gray-500">
        <div className="mb-3 text-lg">{title}</div>
        <div>{description}</div>
      </div>
    </Link>
  );
};

export default Card;