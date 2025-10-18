'use client';

import { lazy, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { LoginSkeleton } from '../login/LoginSkeleton';

const Login = lazy(() => import('../login/Login'));

export function RedirectButton() {
  const t = useTranslations();

  const { open } = useModal();

  return (
    <button
      className='border-b-2'
      onClick={() =>
        open(
          <Suspense fallback={<LoginSkeleton />}>
            <Login />
          </Suspense>,
        )
      }
    >
      {t('Auth.Login')}
    </button>
  );
}
