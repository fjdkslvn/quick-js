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

  const handleClick = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    // 페이지 로드 시 textarea에 포커스가 자동으로 설정되지 않도록 설정
    if (textareaRef.current) {
      textareaRef.current.blur();
    }

    const handleFocus = (event: FocusEvent) => {
      if (
        textareaRef.current &&
        event.target instanceof Node &&
        !textareaRef.current.contains(event.target)
      ) {
        textareaRef.current.blur();
      }
    };

    window.addEventListener('focus', handleFocus, true);

    return () => {
      window.removeEventListener('focus', handleFocus, true);
    };
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
        onClick={handleClick}
        autoFocus={false}
        tabIndex={-1}
      />
    </>
  );
};

export default DataInput;