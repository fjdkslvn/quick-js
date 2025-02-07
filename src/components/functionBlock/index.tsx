'use client'

import CodeBlock from "@/components/functionBlock/codeBlock";
import ResultBlock from "@/components/functionBlock/resultBlock";

const FunctionBlock: React.FC<{ typeID:string, funcTypeID:string, id:number, title?: string, favoritesTitle?:string, description: string, funcString:string, result: string }> = ({ typeID, funcTypeID, id, title, favoritesTitle, description, funcString, result}) => {
  return (
    <div className="pt-16" id={`${typeID}-${funcTypeID}-${id}`}>
      {title &&
        <h1 className="text-2xl font-bold pt-4 flex items-center">
          {title}
        </h1>}
      {description &&
        <div className="mt-2">
          {favoritesTitle && <h2 className="mb-1 ttext-lg font-semibold">{`* ${favoritesTitle} *`}</h2>}
          <h2 className="mb-3">{description}</h2>
        </div>}
      <CodeBlock typeID={typeID} funcTypeID={funcTypeID} id={id} funcString={funcString}/>
      <ResultBlock resultData={result}/>
    </div>
  );
};

export default FunctionBlock;