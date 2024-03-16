import { functionData } from '@/constants/fucntionData'
import FunctionBlock from '@/components/functionBlock';

export default function FunctionPage({ params }: { params: { type: string } }) {

  return (
    <>
      <div>
      {functionData[params.type].map((funcInfo, index) => (
        <FunctionBlock key={index} title={funcInfo.title} description={funcInfo.description} funcType={funcInfo.funcType}/>
      ))}
    </div>
    </>
  );
}
  