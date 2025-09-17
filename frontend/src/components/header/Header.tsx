'use client';

import { CircleUser } from 'lucide-react';
import { lazy } from 'react';
import { HeaderForm } from './HeaderForm';
import { useModal } from '../modal/ModalProvider';

import { Burger } from './Burger';

const Login = lazy(() => import('@/components/Auth/Login'));

export function Header() {
  const { open } = useModal();

  return (
    <header className='py-3.5 border-b dark:bg-black/70 backdrop-blur-xl border-black/20 dark:border-white/10 sticky z-[2] top-0 mb-3.5'>
      <div className='flex justify-between px-3 items-center'>
        <div className='hidden max-md:block'>
          <Burger />
        </div>
        <HeaderForm />
        <div className='flex gap-3 font-bold max-md:hidden'>
          <div className='h-full w-[1px] bg-white/10' />
          <button
            className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg w-10 h-10 flex justify-center items-center'
            onClick={() => open(<Login />)}
          >
            <CircleUser />
          </button>
        </div>
      </div>
    </header>
  );
}
