'use client';
import { useEffect, useState } from 'react';
import { ThemeButtons } from './ThemeButtons';
import { THEMES_DATA } from '@/shared/data/themes.data';
import { useTheme } from 'next-themes';

export function Theme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className='flex justify-end px-3 gap-1'>
      {THEMES_DATA.map((element) => (
        <ThemeButtons element={element} key={element.id} theme={theme} setTheme={setTheme} />
      ))}
    </div>
  );
}
