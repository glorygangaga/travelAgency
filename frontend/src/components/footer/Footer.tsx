'use client';

import { THEMES_DATA } from '@/shared/data/themes.data';
import { memo, useEffect, useState } from 'react';
import { FooterButtons } from './FooterButtons';

export function FooterElement() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const localTheme = localStorage.getItem('theme');

    const dark = localTheme === 'dark' || (!localTheme && prefersDark);
    setIsDark(dark);
  }, []);

  useEffect(() => {
    if (isDark === null) return;

    const root = document.documentElement;

    if (!isDark) {
      root.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      root.classList.add('dark');
      localStorage.theme = 'dark';
    }
  }, [isDark]);

  return (
    <footer className='py-1.5 border-t border-white/10 sticky bottom-0'>
      <div className='flex justify-end px-3 gap-1'>
        {THEMES_DATA.map((element) => (
          <FooterButtons element={element} key={element.id} isDark={isDark} setIsDark={setIsDark} />
        ))}
      </div>
    </footer>
  );
}

export const Footer = memo(FooterElement);
