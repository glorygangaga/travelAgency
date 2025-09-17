'use client';

import { useState, type FC } from 'react';
import type { AsideElementType } from '../../../shared/types/aside.types';
import { iconMap } from '../../../shared/data/aside.data';
import { ChevronRight } from 'lucide-react';
import AsideExtent from './Extentions/AsideExtent';

interface Props {
  lists: AsideElementType;
  CloseMenu?: () => void;
}

const AsideExtentEl: FC<Props> = ({ lists, CloseMenu }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Icon = iconMap[lists.icon];

  return (
    <div>
      <button
        className='flex cursor-pointer justify-between group-hover:gap-2 max-md:gap-2 max-md:justify-start group-hover:justify-start px-4 rounded-md py-2 transition-colors hover:bg-black/15 dark:hover:bg-white/10 w-full'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className='flex group-hover:gap-2 max-md:gap-2 items-center w-full'>
          <Icon className='w-5' />
          <span className='max-w-0 invisible hidden overflow-hidden opacity-0 max-md:block max-md:max-w-fit max-md:visible max-md:opacity-100 group-hover:block group-hover:max-w-fit group-hover:visible group-hover:opacity-100 transition-all duration-500 ease-in-out'>
            {lists.text}
          </span>
        </div>
        <ChevronRight
          className={`max-w-0 invisible overflow-hidden opacity-0 group-hover:max-w-fit max-md:max-w-fit max-md:visible group-hover:visible max-md:opacity-100 group-hover:opacity-100 transition-all duration-500 ease-in-out
          ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>
      {isOpen && (
        <ul className='flex-col gap-2 pl-2 ml-6 border-l-2 border-black/20 dark:border-white/20 pt-2 hidden max-md:flex group-hover:flex'>
          {lists.extentions &&
            lists.extentions.map((extent) => (
              <AsideExtent
                key={extent.data}
                data={extent.data}
                element={extent.element}
                CloseMenu={CloseMenu}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default AsideExtentEl;
