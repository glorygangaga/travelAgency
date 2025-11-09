'use client';

import { useQuery } from '@tanstack/react-query';

import { Loading } from '@/components/ui/loading/Loading';
import { bookingService } from '@/services/booking.service';
import { CheckoutCard } from './CheckoutCard';

interface Props {
  booking_id: string;
}

export function Checkout({ booking_id }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['booking', booking_id],
    queryFn: () => bookingService.getUserBooking(+booking_id),
    retry: false,
  });

  return (
    <section>
      {isLoading ? (
        <Loading />
      ) : data ? (
        <CheckoutCard booking={data} />
      ) : (
        isError && <h1>Something went wrong</h1>
      )}
    </section>
  );
}
