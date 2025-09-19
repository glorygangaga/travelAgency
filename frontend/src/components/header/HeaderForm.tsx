'use client';

import { Search } from 'lucide-react';
import { useModal } from '../modal/ModalProvider';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export function HeaderForm() {
  const t = useTranslations();

  const [canClose, setCanClose] = useState<boolean>(false);
  const { open, isOpen, close } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK' && !isOpen) {
        e.preventDefault();
        setCanClose(true);
        open(<div>Finder</div>);
      } else if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK' && isOpen && canClose) {
        e.preventDefault();
        setCanClose(false);
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <form className='relative cursor-pointer h-10' onClick={() => open(<div>Finder</div>)}>
      <div className='absolute left-1.5 top-1/2 -translate-y-1/2 text-sm flex gap-3 items-center font-bold z-0'>
        <Search className='w-5 h-5' />
        <span>{t('FINDER')}</span>
      </div>
      <input
        type='text'
        id='findInput'
        className='cursor-pointer border rounded-lg border-black/10 dark:border-white/20 w-full h-full bg-balck/5 bg-black/[3] dark:bg-white/5 outline-none px-7 transition-colors hover:bg-black/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10 focus-within:hover:bg-black/5'
        readOnly
      />
      <div className='max-md:hidden absolute right-2 top-1/2 -translate-y-1/2 border px-2 h-7 flex justify-center items-center text-sm font-bold rounded-md border-black/10 bg-white dark:bg-black dark:border-white/20'>
        <span>Ctrl K</span>
      </div>
    </form>
  );
}
