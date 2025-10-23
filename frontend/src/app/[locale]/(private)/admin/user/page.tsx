import { AdminUsers } from '@/components/routes/private/admin/lists/user/AdminUsers';
import { NO_INDEX_PAGE } from '@/shared/data/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User page',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return <AdminUsers />;
}
