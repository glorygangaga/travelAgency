import { PrivateHeader } from '@/components/routes/private/header/PrivateHeader';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <PrivateHeader />
      <main className='container mx-auto px-1 pb-7'>{children}</main>
    </>
  );
}
