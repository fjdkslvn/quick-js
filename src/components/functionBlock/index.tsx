'use client'

import CodeBlock from "@/components/functionBlock/codeBlock";
import ResultBlock from "@/components/functionBlock/resultBlock";
import Favorites from "@/components/favorites";

const FunctionBlock: React.FC<{ id:number, title: string, description: string, displayCode: string, result: string }> = ({ id, title, description, displayCode, result}) => {

  return (
    <div className="pt-16" id={`docs${id}`}>
      <h1 className="text-2xl font-bold mb-2 pt-4 flex items-center">
        {title}
        <Favorites docsID={id}/>
      </h1>
      <h2 className="mb-3">{description}</h2>
      <CodeBlock displayCode={displayCode}/>
      <ResultBlock resultData={result}/>
    </div>
  );
};

export default FunctionBlock;