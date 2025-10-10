'use client';

import { useUserStore } from '@/store/userStore';

export function SettingsInfo() {
  const { user } = useUserStore();

  return <form>SettingsInfo</form>;
}
