import { User } from '@/components/user/User';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'user account',
  description: 'account',
};

export default function Page() {
  return <User />;
}
