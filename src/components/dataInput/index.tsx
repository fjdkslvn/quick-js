import { useRecoilState, RecoilState, useResetRecoilState } from 'recoil';
import { dataSelector } from '@/recoil/funcDataAtom';
import { useEffect, useRef, useState } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

type DataSelectorType = keyof typeof dataSelector;

const DataInput: React.FC<{ dataType: DataSelectorType }> = ({ dataType }) => {
  const selectedData = dataSelector[dataType] as RecoilState<string>;
  const [data, setData] = useRecoilState<string>(selectedData);
  const [resetActive, setResetActive] = useState(false);
  const focusRef = useRef<HTMLDivElement>(null);
  const resetValue = useResetRecoilState(selectedData);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResetActive(true);
    setData(e.target.value);
  };

  const resetData = () => {
    setResetActive(false);
    resetValue();
  }

  useEffect(() => {
    // 페이지 로드시 textarea의 focus를 뻇는 작업
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  return (
    <div className="relative">
      <div ref={focusRef} autoFocus={true}></div>
      <textarea
        className="w-full min-h-24 px-3 py-2 text-sm dark:bg-backDarkColor"
        value={data}
        maxLength={1000}
        placeholder={'데이터를 넣어주세요.'}
        onChange={handleChange}
      />
      <RestartAltIcon className={["cursor-pointer absolute right-2 bottom-4", resetActive ? "text-amber-500 dark:text-amber-500" : "text-gray-600 dark:text-gray-300"].join(' ')} onClick={resetData}/>
    </div>
  );
};

export default DataInput;
