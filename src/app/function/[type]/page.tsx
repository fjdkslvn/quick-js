import { functionData } from '@/constants/fucntionData'
import FunctionBlock from '@/components/functionBlock';

export default function FunctionPage({ params }: { params: { type: string } }) {

  return (
    <>
      <div>
        <h2>{params.type}</h2>
        {Object.keys(functionData[params.type]).map((funcName, index) => (
          <div key={funcName}>{funcName}</div>
        ))}
    </div>
    </>
  );
}
  