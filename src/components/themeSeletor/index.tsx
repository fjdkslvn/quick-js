import { useTheme } from "next-themes";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import MonitorIcon from '@mui/icons-material/Monitor';
import { useEffect, useState, useRef } from "react";

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [themeState, setThemeState] = useState<string>();
  const [themeToggle, setThemeToggle] = useState(false);
  const themeSelectorRef = useRef<HTMLDivElement>(null);

  const themeShowToggle = () => {
    setThemeToggle(!themeToggle);
  };

  const handleChange = (themeValue: string) => {
    setTheme(themeValue);
    setThemeToggle(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (themeSelectorRef.current && !themeSelectorRef.current.contains(event.target as Node)) {
      setThemeToggle(false);
      event.stopPropagation(); // 이벤트 버블링 중지
    }
  };  

  useEffect(() => {
    setThemeState(theme);
  },[theme]);

  useEffect(() => {
    if (themeToggle) {
      document.addEventListener('click', handleClickOutside, { capture: true });
    } else {
      document.removeEventListener('click', handleClickOutside, { capture: true });
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, { capture: true });
    };
  }, [themeToggle]);

  return (
    <div>
        <div className="text-blue-500 mr-6 cursor-pointer" onClick={themeShowToggle}>
          {themeState === 'light'
            ? <LightModeOutlinedIcon id="theme_light"/>
            : themeState === 'dark'
            ? <BedtimeOutlinedIcon id="theme_dark"/>
            : <MonitorIcon id="theme_system"/>}
        </div>
        {themeToggle &&
          <div ref={themeSelectorRef} className="absolute top-20 right-4 w-28 bg-white shadow-lg py-1 rounded-md border-solid border border-gray-300 text-gray-900 font-medium text-sm dark:text-gray-100 dark:bg-backDarkColor">
            <div className={["flex flex-row cursor-pointer px-3 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800", theme === 'light' && "text-blue-500"].join(' ')} onClick={() => handleChange('light')}>
              <LightModeOutlinedIcon className={[theme === 'light'?"text-blue-500":"text-gray-400", "w-5 mr-2"].join(' ')}/>
              Light
            </div>
            <div className={["flex flex-row cursor-pointer px-3 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800", theme === 'dark' && "text-blue-500"].join(' ')} onClick={() => handleChange('dark')}>
              <BedtimeOutlinedIcon className={[theme === 'dark'?"text-blue-500":"text-gray-400", "w-5 mr-2"].join(' ')}/>
              Dark
            </div>
            <div className={["flex flex-row cursor-pointer px-3 py-1 hover:bg-gray-100 dark:hover:bg-zinc-800", theme === 'system' && "text-blue-500"].join(' ')} onClick={() => handleChange('system')}>
              <MonitorIcon className={[theme === 'system'?"text-blue-500":"text-gray-400", "w-5 mr-2"].join(' ')}/>
              System
            </div>
          </div>
        }
    </div>
  );
};

export default ThemeSelector;