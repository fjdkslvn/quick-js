import { useTheme } from "next-themes";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import BedtimeOutlinedIcon from '@mui/icons-material/BedtimeOutlined';
import MonitorIcon from '@mui/icons-material/Monitor';
import { useEffect, useState, useRef } from "react";

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [themeState, setThemeState] = useState<string>();
  const [themeToggle, setThemeToggle] = useState(false);
  const themeSelectorPCRef = useRef<HTMLDivElement>(null);
  const themeSelectorMobileRef = useRef<HTMLDivElement>(null);

  const themeShowToggle = () => {
    setThemeToggle(!themeToggle);
  };

  const handleChange = (themeValue: string) => {
    setTheme(themeValue);
    setThemeToggle(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (themeSelectorPCRef.current && !themeSelectorPCRef.current.contains(event.target as Node) && themeSelectorMobileRef.current && !themeSelectorMobileRef.current.contains(event.target as Node)) {
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
    <div className="relative">
      <div className="invisible-mobile">
        <div className="mr-6 cursor-pointer" onClick={themeShowToggle}>
          {themeState === 'light'
            ? <LightModeOutlinedIcon id="theme_light"/>
            : themeState === 'dark'
            ? <BedtimeOutlinedIcon id="theme_dark"/>
            : <MonitorIcon id="theme_system"/>}
        </div>
        {themeToggle &&
          <div ref={themeSelectorPCRef} className="absolute top-16 right-2 w-28 bg-white shadow-lg py-1 rounded-md border-solid border border-gray-300 text-gray-900 font-medium text-sm dark:text-gray-100 dark:bg-backDarkColor">
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
      <div className="visible-mobile border-t border-zinc-200 pt-1">
        <div className="cursor-pointer text-sm pl-2 h-9 my-1 flex items-center rounded text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800" onClick={themeShowToggle}>
          {themeState === 'light'
            ? <div className="flex"><LightModeOutlinedIcon id="theme_light" className="mr-2"/>Light</div>
            : themeState === 'dark'
            ? <div className="flex"><BedtimeOutlinedIcon id="theme_dark" className="mr-2"/>Dark</div>
            : <div className="flex"><MonitorIcon id="theme_system" className="mr-2"/>System</div>}
        </div>

        {themeToggle &&
          <div ref={themeSelectorMobileRef} className="w-full absolute bottom-14 w-28 bg-white shadow-lg py-1 rounded-md border-solid border border-gray-300 text-gray-900 font-medium text-sm dark:text-gray-100 dark:bg-backDarkColor">
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
    </div>
  );
};

export default ThemeSelector;