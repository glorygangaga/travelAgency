import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { FullTourData } from '@/shared/types/tour.types';
import { FOOD_DATA } from '@/shared/data/Food.data';
import Calendar from '@/components/ui/calendar/Calendar';
import { Reviews } from '@/components/reviews/Reviews';

interface Props {
  tour_id: string;
}

export async function Tour({ tour_id }: Props) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/tour/full/${tour_id}`, {
    next: { revalidate: 600 },
    method: 'GET',
  });

  let tour: FullTourData | null = null;
  try {
    tour = await res.json();
  } catch {
    return <h1 className='text-center text-5xl font-bold pt-10'>Invalid response from server</h1>;
  }

  if (!tour) return <h1>Tour not found</h1>;

  const tourAdditionalData = [
    tour.tour_type,
    `${tour.price_person} $`,
    `Count: ${tour.available_slots}`,
    `Food: ${FOOD_DATA[tour.food_type]}`,
  ];

  const tourInfo = [
    {
      text: tour.country.country_name,
      link: `/country/${tour.country_id}`,
      additional: 'Country: ',
    },
    { text: tour.hotel.hotel_name, link: `/hotel/${tour.hotel_id}`, additional: 'Hotel: ' },
  ];

  return (
    <>
      <article className='max-w-6xl mx-auto flex items-center gap-3 justify-evenly mb-5 p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg min-lg:flex-row flex-col'>
        <div className='grid gap-3 justify-items-start'>
          <div>
            <h1 className='text-4xl font-bold'>{tour.title}</h1>
            <p>{tour.description}</p>
          </div>
          <div className='flex gap-2'>
            {tourInfo.map((tourData) => (
              <p
                key={tourData.link}
                className='p-2 border dark:border-white/20 border-black/20 rounded-lg relative transition-transform hover:scale-[101%]'
              >
                <span>
                  {tourData.additional} {tourData.text}
                </span>
                <Link href={tourData.link} className='absolute left-0 top-0 w-full h-full' />
              </p>
            ))}
          </div>
          <div className='flex gap-3 flex-wrap'>
            {tourAdditionalData.map((tourData) => (
              <p
                key={tourData}
                className='p-2 border dark:border-white/20 border-black/20 rounded-lg'
              >
                {tourData}
              </p>
            ))}
          </div>
          <button className='px-20 py-3 rounded-md dark:bg-white bg-black text-white dark:text-black w-full min-lg:w-fit flex gap-2 justify-center'>
            <ShoppingBag />
            <span>Buy a tour</span>
          </button>
        </div>
        <Calendar start_date={tour.start_date} end_date={tour.end_date} />
      </article>
      <Reviews tour_id={tour.tour_id} />
    </>
  );
}
