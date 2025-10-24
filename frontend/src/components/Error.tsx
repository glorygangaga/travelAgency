'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export function Error() {
  const router = useRouter();

  return (
    <main className='flex flex-col bg-black text-white justify-center items-center h-full font-bold gap-2'>
      <h1 className='text-7xl max-md:text-3xl'>Page not found</h1>
      <p className='text-7xl max-md:text-3xl'>404</p>
      <button onClick={() => router.back()} className='px-4 py-2 bg-white text-black rounded-xl'>
        Go back to the previous page
      </button>
    </main>
  );
}
