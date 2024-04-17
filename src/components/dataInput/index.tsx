import { useRecoilState, RecoilState } from 'recoil';
import { dataSelector } from '@/recoil/atom';

type DataSelectorType = keyof typeof dataSelector;

const DataInput: React.FC<{ dataType: DataSelectorType }> = ({ dataType }) => {
  const selectedData = dataSelector[dataType] as RecoilState<string>; // selectedData의 타입을 RecoilState<string>으로 명시
  const [data, setData] = useRecoilState<string>(selectedData); // useRecoilState의 제네릭 타입을 string으로 명시

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  }

  return (
    <>
      <textarea className="w-full min-h-24 px-3 py-2 text-sm" value={data} maxLength={1000} placeholder={'데이터를 넣어주세요.'} onChange={handleChange} />
    </>
  );
};

export default DataInput;
