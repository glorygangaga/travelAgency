import { Ellipsis, LogOut, Pencil } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logoutUser } from '@/lib/auth';
import { User } from '@/shared/types/user.types';
import { useUserStore } from '@/store/userStore';
import { ListsUserInfo } from './openHistory/ListsUserInfo';

interface Props {
  user: User;
}

export function UserInfo({ user }: Props) {
  const { push } = useRouter();
  const { logout } = useUserStore();

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) {
      push('/');
      logout();
    }
  };

  return (
    <section className='grid gap-3 max-w-6xl mx-auto'>
      <aside className='p-4 bg-black/5 dark:bg-white/10 rounded-2xl backdrop-blur-sm'>
        <div className='flex justify-between items-start'>
          <div>
            <div className='flex gap-3 mb-3'>
              <h1 className='text-2xl font-bold'>
                {user.name ? user.name : user.email.split('@')[0]}
              </h1>
              <div className='min-h-full w-[1px] bg-black/20 dark:bg-white/20' />
              <div className='flex gap-2'>
                <Link
                  href='/account/settings'
                  className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg p-1.5 flex justify-center items-center'
                >
                  <Pencil className='w-5 h-5' />
                </Link>
                <button className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg p-1.5 flex justify-center items-center'>
                  <Ellipsis />
                </button>
              </div>
            </div>
            <div>
              <span className='bg-white border p-1 rounded-md border-black/20 dark:bg-white/20 dark:border-white/20'>
                {user.user_id}
              </span>
            </div>
          </div>

          <button
            className='p-2 rounded-lg border border-black/20 dark:border-white/15 dark:bg-black/20 bg-white/50 transition-colors hover:dark:bg-black/10 hover:bg-white text-red-600'
            onClick={handleLogout}
          >
            <LogOut className='w-5 h-5' />
          </button>
        </div>
      </aside>
      <ListsUserInfo />
    </section>
  );
}
