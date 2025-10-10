'use client';

import { CircleUser, Languages } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { useTranslations } from 'next-intl';

import { useModal } from '../modal/ModalProvider';
import { LoginSkeleton } from '../Auth/login/LoginSkeleton';
import { LanguageSkeleton } from '../language/LanguageSkeleton';
import { useUserStore } from '@/store/userStore';
import Link from 'next/link';

const Language = lazy(() => import('../language/Language'));
const Login = lazy(() => import('@/components/Auth/login/Login'));

export function HeaderButtons() {
  const { user, loading } = useUserStore();

  const t = useTranslations();
  const { open } = useModal();

  return (
    <div className='flex gap-3 font-bold max-md:hidden'>
      {user ? (
        <Link
          href='/account'
          className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg flex gap-2 px-2 justify-center items-center'
        >
          <CircleUser />
          <p>{user ? (user.name ? user.name : user.email.split('@')[0]) : t('ASIDE.Account')}</p>
        </Link>
      ) : (
        <button
          className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg flex gap-2 px-2 justify-center items-center'
          onClick={() =>
            open(
              <Suspense fallback={<LoginSkeleton />}>
                <Login />
              </Suspense>,
            )
          }
        >
          <CircleUser />
          {loading ? (
            <div className='w-16 h-6 bg-black/20 dark:bg-white/20 rounded-sm' />
          ) : (
            <p>{t('ASIDE.Account')}</p>
          )}
        </button>
      )}
      <div className='min-h-full w-[1px] dark:bg-white/10 bg-black/10' />
      <button
        className='transition-colors dark:hover:bg-white/10 hover:bg-black/10 rounded-lg w-10 h-10 flex justify-center items-center'
        onClick={() =>
          open(
            <Suspense fallback={<LanguageSkeleton />}>
              <Language />
            </Suspense>,
          )
        }
      >
        <Languages />
      </button>
    </div>
  );
}
