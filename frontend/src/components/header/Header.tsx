'use client';

import { CircleUser } from 'lucide-react';
import { HeaderFinder } from './HeaderFinder';
import { HeaderForm } from './HeaderForm';
import { useModal } from '../modal/ModalProvider';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/components/Auth/Login'));

export function Header() {
  const { open } = useModal();

  return (
    <header className='py-3.5 border-b border-white/10 sticky top-0 mb-3.5'>
      <div className='flex justify-between px-3'>
        <HeaderFinder />
        <HeaderForm />
        <div className='flex gap-3 font-bold'>
          {/* <button className='flex gap-2 items-center transition-colors hover:bg-white/10 px-4 py-2 rounded-lg'>
            <Wallet />
            <span>Connect wallet</span>
          </button> */}
          <div className='h-full w-[1px] bg-white/10' />
          <button
            className='transition-colors hover:bg-white/10 rounded-lg w-10 h-10 flex justify-center items-center'
            onClick={() => open(<Login />)}
          >
            <CircleUser />
          </button>
        </div>
      </div>
    </header>
  );
}
