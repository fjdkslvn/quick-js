import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Copy } from '@public/svgs';
import Toast from '@/components/functionBlock/toast';
import { useTheme } from 'next-themes';

const CodeBlock: React.FC<{ displayCode: string;}> = ({ displayCode }) => {

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
        </div>
        {showToast && <Toast message={'복사되었습니다.'} onClose={() => setShowToast(false)} />}
      </div>
    </>
  );
};

export default CodeBlock;
