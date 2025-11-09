import Link from 'next/link';

import Calendar from '@/components/ui/calendar/Calendar';
import { BookingType } from '@/shared/types/booking.types';

interface Props {
  booking: BookingType;
}

const list = ['Cash', 'Card', 'Online payment'];

export function CheckoutCard({ booking }: Props) {
  return (
    <div className='flex gap-10 max-lg:flex-col-reverse max-lg:gap-5 mb-5'>
      <div className='w-full h-fit gap-3 p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg min-lg:flex-row flex-col'>
        <h1 className='text-center text-3xl font-bold'>Checkout</h1>
        <div className='flex justify-between w-full'>
          <div className='p-4 bg-white border border-black/20 dark:bg-zinc-900 rounded-2xl grid min-2xl:w-2/5 w-full'>
            <h1 className='text-center mb-2 text-2xl font-bold'>Payment method</h1>
            <div className='grid gap-2'>
              {list.map((button) => (
                <button key={button} className='p-2 bg-black/20 dark:bg-white/20 rounded-lg'>
                  {button}
                </button>
              ))}
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className='max-w-md max-lg:max-w-full w-full h-fit flex items-center justify-center gap-3 p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg flex-col'>
        <div className='grid justify-items-center w-max'>
          <h1>Numbers of people: {booking.num_people}</h1>
          <h1>Total: {booking.total_price}$</h1>
          <Link href={`/tour/${booking.tour_id}`} className='border-b w-fit'>
            See a tour
          </Link>
        </div>

        <div className='grid justify-items-center pt-4'>
          <h1>Booking date</h1>
          <Calendar
            start_date={booking.booking_date}
            end_date={booking.booking_date}
            showInfo={false}
          />
        </div>
      </div>
    </div>
  );
}
