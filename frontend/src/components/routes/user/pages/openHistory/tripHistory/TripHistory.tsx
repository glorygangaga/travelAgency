'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { TripSkeleton } from './TripSkeleton';
import { TripItems } from './TripItems';
import { bookingService } from '@/services/booking.service';
import { getBookingsTypeResponse } from '@/shared/types/booking.types';

export default function TripHistory() {
  const t = useTranslations('USER.BOOKINGS');
  const { data, isLoading, isError } = useQuery<getBookingsTypeResponse>({
    queryKey: ['booking'],
    queryFn: () => bookingService.getUserBookings(),
  });

  return (
    <div className='p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg backdrop-blur-sm shadow-[5px_5px_15px_0px_rgba(0,0,0,0.10)]'>
      {isLoading ? (
        <TripSkeleton />
      ) : data && data.length > 0 ? (
        <TripItems data={data} />
      ) : isError ? (
        <h1 className='font-bold text-2xl text-center text-red-600'>Something went wrong</h1>
      ) : (
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='font-bold text-2xl text-center'>{t('NOT')}</h1>
          <Link
            className='px-5 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black'
            href={'/tours'}
          >
            {t('BOOK')}
          </Link>
        </div>
      )}
    </div>
  );
}
