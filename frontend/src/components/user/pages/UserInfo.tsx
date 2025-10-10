import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logoutUser } from '@/lib/auth';
import { User } from '@/shared/types/user.types';
import { useUserStore } from '@/store/userStore';

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
    <div>
      <aside className='max-w-6xl mx-auto p-4 bg-black/5 dark:bg-white/10 rounded-2xl backdrop-blur-sm'>
        <div className='flex items-center gap-3 mb-3'>
          <h1 className='text-2xl font-bold'>{user.name ? user.name : user.email.split('@')[0]}</h1>
          <Link
            href='/account/settings'
            className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg p-1.5 flex justify-center items-center'
          >
            <Pencil className='w-5' />
          </Link>
        </div>
        <div>
          <span className='bg-white border p-1 rounded-md border-black/20 dark:bg-white/20 dark:border-white/20'>
            {user.user_id}
          </span>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </aside>
    </div>
  );
}
