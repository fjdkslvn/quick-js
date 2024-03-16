'use client'

import CodeBlock from "@/components/functionBlock/codeBlock";
import ResultBlock from "@/components/functionBlock/resultBlock";
import { useState } from "react";

const FunctionBlock: React.FC<{ title: string, description: string, funcType: string}> = ({title, description, funcType}) => {
  const [result, setResult] = useState('');

  return (
    <div className="mt-14">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <h2 className="mb-3">{description}</h2>
      <CodeBlock funcType={funcType} setResult={setResult}/>
      <ResultBlock resultData={result}/>
    </div>
  );
};

export default FunctionBlock;