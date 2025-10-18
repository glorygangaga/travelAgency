'use client';

import { useUserStore } from '@/store/userStore';
import { UserSkeleton } from '../UserSkeleton';
import { HandleLogout } from '../HandleLogout';
import { UserMainInfo } from './UserMainInfo';

export function UserInfoHeader() {
  const { user } = useUserStore();

  return user ? (
    <aside className='p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg backdrop-blur-sm shadow-[5px_5px_15px_0px_rgba(0,0,0,0.10)]'>
      <div className='flex justify-between items-start'>
        <UserMainInfo />
        <HandleLogout />
      </div>
    </aside>
  ) : (
    <UserSkeleton />
  );
}
