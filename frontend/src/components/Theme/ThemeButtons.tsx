'use client';
import { THEMES_DATA_TYPE_EL } from '@/shared/data/themes.data';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  element: THEMES_DATA_TYPE_EL;
  theme?: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export function ThemeButtons({ element, theme, setTheme }: Props) {
  const Icon = element.icon;
  return (
    <button
      key={element.id}
      onClick={() => setTheme(element.type)}
      className={`flex justify-center items-center p-2 rounded-sm transition-colors hover:bg-black/10 dark:hover:bg-white/10
    ${
      theme === element.type
        ? 'transition-none border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5'
        : ''
    }
  `}
    >
      <Icon className='w-5 h-5' />
    </button>
  );
}
