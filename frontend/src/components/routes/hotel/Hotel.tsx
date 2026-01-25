import Link from 'next/link';

import { hotelWithCountry } from '@/shared/types/hotel.types';
import { ToursByHotel } from './ToursByHotel';
import { CarouselImage } from '@/components/ui/carousel/CarouselImage';

interface Props {
  hotel_id: string;
}

export async function Hotel({ hotel_id }: Props) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/hotel/${hotel_id}`, {
    next: { revalidate: 600 },
    method: 'GET',
  });

  if (!res.ok) {
    return <h1 className='text-center text-5xl font-bold pt-10'>Country not found</h1>;
  }

  let hotel: hotelWithCountry;

  try {
    hotel = await res.json();
  } catch {
    return <h1 className='text-center text-5xl font-bold pt-10'>Country not found</h1>;
  }

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
        {hotel.images && hotel.images.length > 0 && (
          <CarouselImage delay={7000} images={hotel.images} allowTouch={true} />
        )}
      </article>
      <ToursByHotel hotel_id={hotel.hotel_id} />
    </>
  );
}
