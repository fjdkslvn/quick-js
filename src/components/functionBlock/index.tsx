'use client'

import CodeBlock from "@/components/functionBlock/codeBlock";
import ResultBlock from "@/components/functionBlock/resultBlock";
import { useState } from "react";

const FunctionBlock: React.FC<{ id:number, title: string, description: string, displayCode: string, result: string }> = ({ id, title, description, displayCode, result}) => {

  return (
    <div className="pt-16" id={`docs_${id}`}>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <h2 className="mb-3">{description}</h2>
      <CodeBlock displayCode={displayCode}/>
      <ResultBlock resultData={result}/>
    </div>
  );
};

export default FunctionBlock;