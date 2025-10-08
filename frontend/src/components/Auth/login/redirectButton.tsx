'use client';

import { useTranslations } from 'next-intl';
import { lazy, Suspense } from 'react';

import { useModal } from '@/components/modal/ModalProvider';
import { RegisterSkeleton } from '../register/RegisterSkeleton';
const Register = lazy(() => import('../register/Register'));

export function RedirectButton() {
  const t = useTranslations();

  const { open } = useModal();

  return (
    <button
      className='border-b-2'
      onClick={() =>
        open(
          <Suspense fallback={<RegisterSkeleton />}>
            <Register />
          </Suspense>,
        )
      }
    >
      {t('Auth.Register')}
    </button>
  );
}
