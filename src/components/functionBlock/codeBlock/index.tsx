import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Copy } from '@public/svgs';
import Toast from '@/components/functionBlock/toast';
import { useTheme } from 'next-themes';
import Favorites from '@/components/favorites';

const CodeBlock: React.FC<{typeID:string, funcTypeID:string, id: number, funcString:string}> = ({ typeID, funcTypeID, id, funcString }) => {
  const [codeString, setCodeString] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState('light');

  useEffect(()=>{
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setSystemTheme('dark');
    } else {
      setSystemTheme('light')
    }

    setDisplayCode();
  },[]);

  // 화면에 보여질 함수 텍스트를 만드는 함수
  const setDisplayCode = () => {
    let newDisplayCode = funcString;
    setCodeString(`const handle = (data) => {
  ${newDisplayCode}
}`);
  }

  const codeCopy = () => {
    navigator.clipboard.writeText(codeString)
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
          <div className="flex items-center">
            <div className="mr-1">
              <Favorites typeID={typeID} funcTypeID={funcTypeID} docsID={id}/>
            </div>
            <Copy className={["cursor-pointer", styles.copyImage, ((theme ==='system' && systemTheme =='dark') || theme === 'dark') ?styles.dark :''].join(' ')} onClick={codeCopy} />
          </div>
        </div>
        <div className={["bg-blue-50 w-full min-h-24 rounded-b-lg px-4 py-2 text-sm text-gray-800 font-medium dark:bg-zinc-800", styles.codeHighlight].join(' ')}>
          {(theme ==='system' && systemTheme =='dark') || theme === 'dark'
            ?<SyntaxHighlighter language={"javascript"} style={a11yDark}>
              {codeString}
            </SyntaxHighlighter>
            :<SyntaxHighlighter language={"javascript"}>
              {codeString}
            </SyntaxHighlighter>}
        </div>
        {showToast && <Toast message={'복사되었습니다.'} onClose={() => setShowToast(false)} />}
      </div>
    </>
  );
};

export default CodeBlock;