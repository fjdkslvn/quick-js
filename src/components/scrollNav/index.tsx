'use client'

const ScrollNav: React.FC<{scrollList:any[]}> = ({scrollList}) => {

    const handleClick = (id: number) => {
        const element = document.getElementById(`docs_${id}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }

  return (
      <div className="min-w-56 pr-4 py-6 h-max sticky top-16 hidden xl:block">
        <div className="text-sm font-semibold text-gray-700 mb-6">On this page</div>
        {scrollList.map((scrollInfo) => (
          <div key={`scrollTitle_${scrollInfo.id}`} className="text-sm font-semibold text-gray-500 mb-3 cursor-pointer hover:text-blue-500" onClick={() => handleClick(scrollInfo.id)}>{scrollInfo.title}</div>
        ))}
      </div>
  );
};

export default ScrollNav;