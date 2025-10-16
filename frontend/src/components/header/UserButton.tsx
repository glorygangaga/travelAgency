import { ChevronDown, CircleUser, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { User } from '@/shared/types/user.types';
import { logoutUser } from '@/lib/auth';
import { useUserStore } from '@/store/userStore';

type Props = {
  user: User;
};

export function UserButton({ user }: Props) {
  const t = useTranslations();
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
    <div className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg group relative flex items-center'>
      <Link href='/account' className='flex gap-2 justify-center items-center p-2'>
        <CircleUser />
        <div className='flex gap-2'>
          <p>{user ? (user.name ? user.name : user.email.split('@')[0]) : t('ASIDE.Account')}</p>
          <ChevronDown className='group-hover:-rotate-180 transition-transform' />
        </div>
      </Link>
      <div className='opacity-0 -translate-y-5 invisible transition-all group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible absolute -right-1/2 top-[105%] border border-black/20 dark:border-white/20 rounded-lg p-2 w-[200%] bg-white dark:bg-black'>
        <Link
          href='/account'
          className='p-2 rounded-lg dark:bg-black/20 bg-white transition-colors hover:dark:bg-white/10 hover:bg-black/10 flex gap-2 justify-between w-full'
        >
          <p>Account</p>
          <CircleUser className='w-5 h-5' />
        </Link>
        <button
          className='p-2 rounded-lg dark:bg-black/20 bg-white transition-colors hover:dark:bg-white/10 hover:bg-black/10 flex gap-2 justify-between w-full text-red-600'
          onClick={handleLogout}
        >
          <p>Logout</p>
          <LogOut className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
}
