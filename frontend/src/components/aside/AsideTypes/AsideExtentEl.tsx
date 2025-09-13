'use client';

import { AsideElementType } from '@/shared/types/aside.types';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { iconMap } from '@/shared/data/aside.data';
import { AsideExtent } from './Extentions/AsideExtent';

interface Props {
  lists: AsideElementType;
}

export function AsideExtentEl({ lists }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Icon = iconMap[lists.icon];

  return (
    <div>
      <button
        className='flex justify-between group-hover:gap-2 group-hover:justify-start px-4 rounded-md py-2 transition-colors hover:bg-white/10 w-full'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className='flex group-hover:gap-2 items-center w-full'>
          <Icon className='w-5' />
          <span className='max-w-0 invisible overflow-hidden opacity-0 group-hover:max-w-fit group-hover:visible group-hover:opacity-100 transition-all duration-500 ease-in-out'>
            {lists.text}
          </span>
        </div>
        <ChevronRight
          className={`max-w-0 invisible overflow-hidden opacity-0 group-hover:max-w-fit group-hover:visible group-hover:opacity-100 transition-all duration-500 ease-in-out
          ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      {isOpen && (
        <ul className='flex-col gap-2 pl-2 ml-6 border-l-2 border-white/20 pt-2 hidden group-hover:flex'>
          {lists.extentions &&
            lists.extentions.map((extent) => <AsideExtent key={extent.text} data={extent} />)}
        </ul>
      )}
    </div>
  );
}
