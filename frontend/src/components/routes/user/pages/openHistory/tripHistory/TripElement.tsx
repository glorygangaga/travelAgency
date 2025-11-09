import { BookingType } from '@/shared/types/booking.types';
import Link from 'next/link';

interface Props {
  booking: BookingType;
}

export function TripElement({ booking }: Props) {
  return (
    <li className='relative border dark:border-white/20 border-black/20 p-2 rounded-lg'>
      <Link
        href={`/checkout/${booking.booking_id}`}
        className='absolute left-0 top-0 w-full h-full'
      />
      <h1>Numbers of people: {booking.num_people}</h1>
      <p>{booking.booking_date.split('T')[0]}</p>
      <p>{booking.total_price}$</p>
      <Link href={`/tour/${booking.tour_id}`} className='relative border-b'>
        See a tour
      </Link>
    </li>
  );
}
