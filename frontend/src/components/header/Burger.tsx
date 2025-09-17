'use client';
import { useEffect, useState } from 'react';
import Aside from '../aside/Aside';
import { Menu, X } from 'lucide-react';

export function Burger() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const body = document.body;
    if (isOpen) body.style.overflow = 'hidden';
    else body.style.overflow = 'auto';
  }, [isOpen]);

  const CloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`dark:bg-black max-md:block hidden bg-white z-20 absolute w-full h-screen left-0 top-0 transition-all p-4 pt-14 ${
          isOpen ? '-translate-x-0' : '-translate-x-full'
        }`}
      >
        <button onClick={() => setIsOpen((prev) => !prev)} className='absolute top-4 left-2'>
          <X size={36} />
        </button>
        <Aside CloseMenu={CloseMenu} />
      </div>
      <div>
        <button className='hidden max-md:block' onClick={() => setIsOpen((prev) => !prev)}>
          <Menu size={28} width={40} />
        </button>
      </div>
    </>
  );
}
