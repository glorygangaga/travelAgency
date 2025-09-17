'use client';

import { Earth } from 'lucide-react';
import AsideItems from './AsideItems';
import type { FC } from 'react';
import { SITE_NAME } from '@/shared/data/names.data';
import Link from 'next/link';

type Props = {
  CloseMenu?: () => void;
};

const Aside: FC<Props> = ({ CloseMenu }) => {
  return (
    <aside className='flex flex-col gap-4 px-2 max-md:pt-2 pt-8 border-r z-10 border-black/20 dark:border-white/10 fixed left-0 max-md:h-min h-screen text-md transition-all group max-md:w-full min-w-[70px] hover:w-auto bg-gray-100 max-md:bg-white dark:bg-black hover:px-4'>
      <Link
        className='flex items-center group-hover:gap-2 max-md:gap-2 justify-center text-2xl font-bold mb-4'
        href='/'
        onClick={() => CloseMenu && CloseMenu()}
      >
        <Earth />
        <span className='hidden max-w-0 invisible opacity-0 group-hover:max-w-fit max-md:max-w-fit max-md:opacity-100 group-hover:opacity-100 max-md:visible group-hover:visible max-md:block group-hover:block transition-opacity duration-500 ease-in-out'>
          {SITE_NAME}
        </span>
      </Link>
      <AsideItems CloseMenu={CloseMenu} />
    </aside>
  );
};

export default Aside;
