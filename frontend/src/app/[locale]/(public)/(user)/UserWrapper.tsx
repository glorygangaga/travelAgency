'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { useUserStore } from '@/store/userStore';

export function UserWrapper({ children }: { children: ReactNode }) {
  const { push } = useRouter();
  const { fetchUserData, error } = useUserStore();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return <>{children}</>;
}
