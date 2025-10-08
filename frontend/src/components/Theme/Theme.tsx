'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { ThemeButtons } from './ThemeButtons';
import { THEMES_DATA } from '@/shared/data/themes.data';
import { ThemeSkeleton } from './ThemeSkeleton';

export function Theme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <ThemeSkeleton />;

  return (
    <div className='flex justify-end px-3 gap-1 relative'>
      {THEMES_DATA.map((element) => (
        <ThemeButtons element={element} key={element.id} theme={theme} setTheme={setTheme} />
      ))}
    </div>
  );
}
