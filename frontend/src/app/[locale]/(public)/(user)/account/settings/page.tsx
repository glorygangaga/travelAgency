import { SettingsInfo } from '@/components/routes/user/settings/SettingsInfo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User settings',
  description: 'User settings',
};

export default function Page() {
  return <SettingsInfo />;
}
