'use client';

import { useUserStore } from '@/store/userStore';
import { UserSkeleton } from './UserSkeleton';
import { UserInfo } from './pages/UserInfo';

export function User() {
  const { user, loading } = useUserStore();

  return <section>{loading ? <UserSkeleton /> : user && <UserInfo user={user} />} </section>;
}
