import { getBookingsTypeResponse } from '@/shared/types/user.types';
import { TripElement } from './TripElement';

interface Props {
  data: getBookingsTypeResponse;
}

export function TripItems({ data }: Props) {
  return (
    <>
      <h1 className='font-bold text-center text-2xl'>Your bookings</h1>
      <ul>
        {data.map((booking) => (
          <TripElement key={booking.booking_id} booking={booking} />
        ))}
      </ul>
    </>
  );
}
