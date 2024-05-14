'use client'

const ScrollNav: React.FC<{scrollList:any[]}> = ({scrollList}) => {

    const handleClick = (id: number) => {
        const element = document.getElementById(`docs_${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }

  return (
      <div className="min-w-56 px-4 py-6 h-max sticky top-16 hidden xl:block">
        <div className="text-sm font-semibold mb-6">On this page</div>
        {scrollList.map((scrollInfo) => (
          <div key={`scrollTitle_${scrollInfo.id}`} className="text-sm font-semibold text-gray-600 pb-3 cursor-pointer dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-500" onClick={() => handleClick(scrollInfo.id)}>{scrollInfo.title}</div>
        ))}
        <div className="w-full h-px bg-zinc-200 my-4 dark:bg-zinc-700"></div>
      </div>
  );
};

export default ScrollNav;