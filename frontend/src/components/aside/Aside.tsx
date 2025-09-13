import { SITE_NAME } from '@/shared/data/names.data';
import { Target } from 'lucide-react';

import Link from 'next/link';
import { AsideItems } from './AsideItems';
import { memo } from 'react';

function AsideComponent() {
  return (
    <aside className='flex flex-col gap-4 px-2 pt-8 border-r z-10 border-white/10 fixed left-0 h-screen text-sm transition-all group hover:w-auto bg-black hover:px-4'>
      <div>
        <Link
          href='/'
          className='flex items-center group-hover:gap-2 justify-center text-2xl font-bold mb-4'
        >
          <Target className='w-7 h-7' />
          <span className='max-w-0 overflow-hidden opacity-0 group-hover:max-w-fit group-hover:opacity-100 transition-all duration-500 ease-in-out'>
            {SITE_NAME}
          </span>
        </Link>
        <AsideItems />
      </div>
    </aside>
  );
}

export const Aside = memo(AsideComponent);
