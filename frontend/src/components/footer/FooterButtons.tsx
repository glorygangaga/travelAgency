import { THEMES_DATA_TYPE_EL } from '@/shared/data/themes.data';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  element: THEMES_DATA_TYPE_EL;
  isDark: boolean | null;
  setIsDark: Dispatch<SetStateAction<boolean | null>>;
}

export function FooterButtons({ element, isDark, setIsDark }: Props) {
  const makeDark = element.type === 'dark';
  const active = isDark === makeDark;

  return (
    <button
      key={element.id}
      onClick={() => setIsDark(makeDark)}
      className={`flex justify-center items-center p-2 rounded-sm transition-colors hover:bg-white/10
        ${active ? 'transition-none border border-white/15 bg-white/5' : ''}
      `}
    >
      <element.icon className='w-5 h-5' />
    </button>
  );
}
