'use client';

import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import { useUserStore } from '@/store/userStore';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { LoginSkeleton } from '@/components/Auth/login/LoginSkeleton';
import { FullTourData } from '@/shared/types/tour.types';

const Login = dynamic(() => import('@/components/Auth/login/Login'), {
  loading: () => <LoginSkeleton />,
});

const CreateBooking = dynamic(() => import('./CreateBooking'));

interface Props {
  tour: FullTourData;
}

export default function BuyTour({ tour }: Props) {
  const { open } = useModal();
  const { push } = useRouter();

  const { user } = useUserStore();
  const t = useTranslations('TOUR');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      open(<Login />);
      return;
    }

    if (!user.fullname || !user.passport_number || !user.phone || !user.date) {
      push('/account/settings?error=true');
      return;
    }

    open(<CreateBooking tour={tour} />);
  };

  return (
    <form onSubmit={handleSubmit} className='max-md:w-full'>
      <button
        className='px-20 py-3 rounded-md dark:bg-white bg-black text-white dark:text-black min-w-[255px] max-md:w-full flex gap-2 justify-center'
        type='submit'
      >
        <ShoppingBag />
        <span>{t('BUY')}</span>
      </button>
    </form>
  );
}
