import { functionData } from '@/constants/fucntionData'
import FunctionBlock from '@/components/functionBlock';

export default function FunctionPage({ params }: { params: { type: string, funcType: string } }) {

  return (
    <>
      <div>
      {functionData[params.type][params.funcType].map((funcInfo, index) => (
        <FunctionBlock key={funcInfo.funcType} title={funcInfo.title} description={funcInfo.description} type={params.type} funcType={funcInfo.funcType}/>
      ))}
    </div>
    </>
  );
}
  