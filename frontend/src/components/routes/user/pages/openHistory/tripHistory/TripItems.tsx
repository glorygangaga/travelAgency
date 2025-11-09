import { useTranslations } from 'next-intl';

import { getBookingsTypeResponse } from '@/shared/types/booking.types';
import { TripElement } from './TripElement';

interface Props {
  data: getBookingsTypeResponse;
}

export function TripItems({ data }: Props) {
  const t = useTranslations('USER.BOOKINGS');

  return (
    <>
      <h1 className='font-bold text-center text-2xl'>{t('YOUR')}</h1>
      <ul>
        {data.map((booking) => (
          <TripElement key={booking.booking_id} booking={booking} />
        ))}
      </ul>
    </>
  );
}
