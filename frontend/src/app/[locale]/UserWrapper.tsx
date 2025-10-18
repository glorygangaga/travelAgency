'use client';

import { useProfile } from '@/shared/lib/hook/useProfile';
import { ReactNode } from 'react';

export function UserWrapper({ children }: { children: ReactNode }) {
  useProfile();
  return <>{children}</>;
}
