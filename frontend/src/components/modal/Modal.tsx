'use client';

import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className='absolute left-0 top-0 w-screen h-screen bg-black/15 flex justify-center items-center z-20 backdrop-blur-xs cursor-pointer text-black dark:text-white'
      onClick={onClose}
    >
      <div
        className='w-auto max-w-10/12 overflow-auto md:max-w-3/5 bg-gray-100 dark:bg-black border border-black/20 dark:border-white/20 p-8 rounded-2xl z-40 cursor-default relative'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute right-1.5 top-1.5 cursor-pointer p-1 transition-colors hover:bg-white/10 rounded-sm'
          onClick={onClose}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
