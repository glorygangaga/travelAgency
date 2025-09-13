'use client';

import { Search } from 'lucide-react';
import { useModal } from '../modal/ModalProvider';

export function HeaderForm() {
  const { open } = useModal();

  return (
    <form className='relative w-96 cursor-text' onClick={() => open(<div>Finder</div>)}>
      <div className='absolute left-1.5 top-1/2 -translate-y-1/2 text-sm flex gap-3 items-center font-bold'>
        <Search className='w-5 h-5' />
        <span>Найти тур</span>
      </div>
      <input
        type='text'
        id='findInput'
        className='border rounded-lg border-white/20 w-full h-full bg-white/5 outline-none px-7'
        readOnly
      />
      <div className='absolute right-2 top-1/2 -translate-y-1/2 border px-2 h-7 flex justify-center items-center text-sm font-bold rounded-md border-white/20'>
        <span>Ctrl K</span>
      </div>
    </form>
  );
}
