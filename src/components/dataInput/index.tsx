import { useRecoilState, RecoilState } from 'recoil';
import { dataSelector } from '@/recoil/funcDataAtom';
import { useEffect, useRef } from 'react';

type DataSelectorType = keyof typeof dataSelector;

const DataInput: React.FC<{ dataType: DataSelectorType }> = ({ dataType }) => {
  const selectedData = dataSelector[dataType] as RecoilState<string>;
  const [data, setData] = useRecoilState<string>(selectedData);
  const focusRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  useEffect(() => {
    // 페이지 로드시 textarea의 focus를 뻇는 작업
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  return (
    <>
      <div ref={focusRef} autoFocus={true}></div>
      <textarea
        className="w-full min-h-24 px-3 py-2 text-sm dark:bg-backDarkColor"
        value={data}
        maxLength={1000}
        placeholder={'데이터를 넣어주세요.'}
        onChange={handleChange}
      />
    </>
  );
};

export default DataInput;
