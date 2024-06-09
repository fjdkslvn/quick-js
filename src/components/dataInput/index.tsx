import { useRecoilState, RecoilState } from 'recoil';
import { dataSelector } from '@/recoil/funcDataAtom';
import { useEffect, useRef } from 'react';

type DataSelectorType = keyof typeof dataSelector;

const DataInput: React.FC<{ dataType: DataSelectorType }> = ({ dataType }) => {
  const selectedData = dataSelector[dataType] as RecoilState<string>;
  const [data, setData] = useRecoilState<string>(selectedData);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.blur();
    }
  }, []);

  return (
    <>
      <textarea
        ref={textareaRef}
        className="w-full min-h-24 px-3 py-2 text-sm dark:bg-backDarkColor"
        value={data}
        maxLength={1000}
        placeholder={'데이터를 넣어주세요.'}
        onChange={handleChange}
        autoFocus={false}
        tabIndex={-1}
      />
    </>
  );
};

export default DataInput;
