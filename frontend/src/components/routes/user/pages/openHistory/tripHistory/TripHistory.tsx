'use client';

import { useQuery } from '@tanstack/react-query';

import { userService } from '@/services/user.service';
import { getBookingsTypeResponse } from '@/shared/types/user.types';
import { TripSkeleton } from './TripSkeleton';
import { TripItems } from './TripItems';

export default function TripHistory() {
  const { data, isLoading, isError } = useQuery<getBookingsTypeResponse>({
    queryKey: ['booking'],
    queryFn: () => userService.getBookings(),
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
          <h1 className='font-bold text-2xl text-center'>There is not bookings in your account</h1>
          <button className='px-5 py-2 rounded-md bg-black/20 dark:bg-white/20'>book a tour</button>
        </div>
      )}
    </div>
  );
}
