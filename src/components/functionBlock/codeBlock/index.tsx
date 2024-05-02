import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useRecoilState, RecoilState } from 'recoil';
import { dataSelector } from '@/recoil/atom';
import { functionData } from '@/constants/fucntionData';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Copy } from '@public/svgs';
import Toast from '@/components/functionBlock/toast';
import { useTheme } from 'next-themes';

const CodeBlock: React.FC<{ dataType: string, id: number, displayCode: string; setResult: (resultData: string) => void }> = ({ dataType, id, displayCode, setResult }) => {

  const selectedData = dataSelector[dataType as keyof typeof dataSelector] as RecoilState<string>; // 타입 명시
  const [data, setData] = useRecoilState<string>(selectedData); // 제네릭 타입 명시
  const [showToast, setShowToast] = useState(false);
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState('light');

  useEffect(()=>{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setSystemTheme('dark');
    } else {
      setSystemTheme('light')
    }    
  },[])

  useEffect(() => {
    createResult(); // 기본 결과값 채우기
  }, [id]);

  const createResult = () => {
    if (data && id) {
      const useData = dataType === 'string' ? data : eval('(' + data + ')');
      const resultData = functionData[`func${id}`](useData);
      setResult(JSON.stringify(resultData));
    }
  }

  const codeCopy = () => {
    const code = `const result = ${displayCode};
    console.log(result);`;

    navigator.clipboard.writeText(code)
      .then(() => {
        setShowToast(true);
      })
      // .catch(err => {
      //     console.error('복사 실패:', err);
      // });
  }

  return (
    <>
      <div className="w-full">
        <div className="bg-blue-100 w-full h-9 rounded-t-lg px-4 py-2 text-sm text-gray-500 font-medium flex justify-between dark:text-gray-300 dark:bg-zinc-700">
          <div>index.js</div>
          <Copy className={["cursor-pointer", styles.copyImage, ((theme ==='system' && systemTheme =='dark') || theme === 'dark') ?styles.dark :''].join(' ')} onClick={codeCopy} />
        </div>
        <div className={["bg-blue-50 w-full min-h-24 rounded-b-lg px-4 py-2 text-sm text-gray-800 font-medium dark:bg-zinc-800", styles.codeHighlight].join(' ')}>
          {(theme ==='system' && systemTheme =='dark') || theme === 'dark'
            ?<SyntaxHighlighter language={"javascript"} style={a11yDark}>
              {`const result = ${displayCode};\nconsole.log(result);`}
            </SyntaxHighlighter>
            :<SyntaxHighlighter language={"javascript"}>
              {`const result = ${displayCode};\nconsole.log(result);`}
            </SyntaxHighlighter>}
          <button className="block mx-auto mb-5 bg-blue-300 px-10 h-10 rounded-lg text-gray-700 font-medium hover:bg-blue-200" onClick={createResult}>실행</button>
        </div>
        {showToast && <Toast message={'복사되었습니다.'} onClose={() => setShowToast(false)} />}
      </div>
    </>
  );
};

export default CodeBlock;
