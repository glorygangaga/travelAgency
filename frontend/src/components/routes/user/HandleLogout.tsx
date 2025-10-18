'use client';

import { authService } from '@/services/auth.service';
import { useUserStore } from '@/store/userStore';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HandleLogout() {
  const { push } = useRouter();
  const { logout } = useUserStore();

  const handleLogout = async () => {
    const res = await authService.logout();
    if (res) {
      push('/');
      logout();
    }
  };

  return (
    <button
      className='p-2 rounded-lg border border-black/20 dark:border-white/15 dark:bg-black/20 bg-white/50 transition-colors hover:dark:bg-black/10 hover:bg-white text-red-600'
      onClick={handleLogout}
    >
      <LogOut className='w-5 h-5' />
    </button>
  );
}
