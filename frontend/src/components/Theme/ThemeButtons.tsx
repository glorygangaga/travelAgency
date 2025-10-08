'use client';
import { THEMES_DATA_TYPE_EL } from '@/shared/data/themes.data';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  element: THEMES_DATA_TYPE_EL;
  theme?: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export function ThemeButtons({ element, theme, setTheme }: Props) {
  const t = useTranslations();
  const Icon = element.icon;

  return (
    <button
      key={element.id}
      onClick={() => setTheme(element.type)}
      className={`flex justify-center items-center p-2 rounded-sm transition-colors hover:bg-black/10 dark:hover:bg-white/10 group w-[38px]
    ${
      theme === element.type
        ? 'transition-none border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5'
        : ''
    }
  `}
    >
      <Icon className='w-5 h-5' />
      <div className='absolute border scale-50 invisible dark:border-white/20 border-black/20 p-2 rounded-lg group-hover:visible group-hover:scale-100 group-hover:opacity-100 -top-12 dark:bg-gray-950 bg-gray-100 transition-all opacity-0'>
        {t(`THEME.${element.type}`)}
      </div>
    </button>
  );
}
