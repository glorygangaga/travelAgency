'use client';

import { Search } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useModal } from '../modal/ModalProvider';
import { Finder } from '../Finder/Finder';

export function HeaderForm() {
  const t = useTranslations();

  const { open, isOpen } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlK = (e.ctrlKey || e.metaKey) && e.code === 'KeyK';

      if (isCtrlK && !isOpen) {
        e.preventDefault();
        open(<Finder />);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <form
      className='relative cursor-pointer h-10'
      onClick={() => open(<Finder />)}
      onSubmit={(e) => {
        e.preventDefault();
        open(<Finder />);
      }}
    >
      <div className='absolute left-1.5 top-1/2 -translate-y-1/2 text-sm flex gap-3 items-center font-bold z-0'>
        <Search className='w-5 h-5' />
        <span>{t('FINDER')}</span>
      </div>
      <input
        type='text'
        id='findInput'
        className='cursor-pointer border rounded-lg border-black/10 dark:border-white/20 w-full h-full bg-balck/5 outline-none px-7 transition-colors hover:bg-black/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10 focus-within:hover:bg-black/5 bg-white dark:bg-black'
        readOnly
      />
      <div className='max-md:hidden absolute right-2 top-1/2 -translate-y-1/2 border px-2 h-7 flex justify-center items-center text-sm font-bold rounded-md border-black/10 bg-white dark:bg-black dark:border-white/20'>
        <span>Ctrl K</span>
      </div>
    </form>
  );
}
