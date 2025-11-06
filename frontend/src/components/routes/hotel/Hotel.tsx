import Link from 'next/link';

import { hotelWithCountry } from '@/shared/types/hotel.types';
import { ToursByHotel } from './ToursByHotel';

interface Props {
  hotel_id: string;
}

export async function Hotel({ hotel_id }: Props) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/hotel/${hotel_id}`, {
    next: { revalidate: 600 },
    method: 'GET',
  });

  if (!res.ok) return <h1>Something went wrong</h1>;

  const hotel: hotelWithCountry = await res.json();

  return (
    <>
      <article className='max-w-5xl flex mx-auto gap-3 items-center justify-center mb-5 p-4 bg-white border border-black/15 dark:bg-black rounded-lg flex-col'>
        <div>
          <div className='flex gap-4 items-center'>
            <h1 className='text-5xl font-bold'>{hotel.hotel_name}</h1>
            <p>{hotel.category}</p>
          </div>
          <div>
            <p>{hotel.description}</p>
          </div>
        </div>
        <Link href={`/country/${hotel.country_id}`} className='text-3xl font-bold'>
          {hotel.country.country_name}
        </Link>
      </article>
      <ToursByHotel hotel_id={hotel.hotel_id} />
    </>
  );
}
