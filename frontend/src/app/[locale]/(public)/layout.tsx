import type { PropsWithChildren } from 'react';

import { Header } from '@/components/header/Header';
import Aside from '@/components/aside/Aside';
import { Footer } from '@/components/footer/Footer';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <div className='flex relative min-h-full text-black dark:text-white bg-gray-100 dark:bg-white/[3]'>
        <div className='min-w-[70px] relative max-md:hidden'>
          <Aside />
        </div>
        <div className='w-full flex flex-col flex-1'>
          <Header />
          <main className='flex-1 px-3'>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
