import { UserInfo } from '@/components/routes/user/pages/UserInfo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'user account',
  description: 'account',
};

export default function Page() {
  return <UserInfo />;
}
