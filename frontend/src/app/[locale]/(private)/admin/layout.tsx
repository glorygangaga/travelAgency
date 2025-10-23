import { AdminLists } from '@/components/routes/private/admin/lists/AdminLists';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <AdminLists />
      {children}
    </>
  );
}
