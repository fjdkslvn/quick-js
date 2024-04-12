'use client'

import CodeBlock from "@/components/functionBlock/codeBlock";
import ResultBlock from "@/components/functionBlock/resultBlock";
import { useState } from "react";

const FunctionBlock: React.FC<{ dataType:string, id:number, title: string, description: string, displayCode: string}> = ({dataType, id, title, description, displayCode}) => {
  const [result, setResult] = useState('');

  return (
    <div className="mt-14">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <h2 className="mb-3">{description}</h2>
      <CodeBlock dataType={dataType} id={id} displayCode={displayCode} setResult={setResult}/>
      <ResultBlock resultData={result}/>
    </div>
  );
};

export default FunctionBlock;