import { Ellipsis, Pencil } from 'lucide-react';
import Link from 'next/link';

import { useUserStore } from '@/store/userStore';

export function UserMainInfo() {
  const { user } = useUserStore();

  return (
    <div>
      <div className='flex gap-3 mb-3'>
        <h1 className='text-2xl font-bold'>
          {user?.username ? user?.username : user?.email.split('@')[0]}
        </h1>
        <div className='min-h-full w-[1px] bg-black/20 dark:bg-white/20' />
        <div className='flex gap-2'>
          <Link
            href='/account/settings'
            className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg p-1.5 flex justify-center items-center'
          >
            <Pencil />
          </Link>
          <button className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg p-1.5 flex justify-center items-center'>
            <Ellipsis />
          </button>
        </div>
      </div>
      <div>
        <span className='bg-white border p-1 rounded-md border-black/20 dark:bg-white/20 dark:border-white/20'>
          {user?.user_id}
        </span>
      </div>
    </div>
  );
}
