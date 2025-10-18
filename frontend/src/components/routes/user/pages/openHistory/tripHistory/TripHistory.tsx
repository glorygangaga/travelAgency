import { getBookingsTypeResponse } from '@/shared/types/user.types';

interface Props {
  bookings: getBookingsTypeResponse;
}

export function TripHistory({ bookings }: Props) {
  return (
    <div className='p-4 bg-black/5 dark:bg-black/60 rounded-lg backdrop-blur-sm'>
      {bookings.length > 0 ? (
        <>
          <h1>Your bookings</h1>
          <ul>
            {bookings.map((booking) => (
              <li key={booking.booking_id}>{booking.booking_date.toISOString().split('T')[0]}</li>
            ))}
          </ul>
        </>
      ) : (
        <h1 className='font-bold text-2xl text-center'>There is not bookings in your account</h1>
      )}
    </div>
  );
}
