import Link from 'next/link';

import { useModal } from '@/components/ui/modal/ModalProvider';
import { FullTourData, TourTypeRes } from '@/shared/types/tour.types';

interface Props {
  tour: FullTourData | TourTypeRes;
}

export function TourCard({ tour }: Props) {
  const { close } = useModal();
  return (
    <li className='relative p-2 rounded-lg border border-black/20 dark:border-white/20 transition-transform'>
      <Link
        href={`/tour/${tour.tour_id}`}
        onClick={() => close()}
        className='absolute left-0 top-0 w-full h-full'
      />
      <div className='flex justify-between min-md:items-center min-md:flex-row items-baseline flex-col'>
        <div>
          <h1 className='text-2xl font-bold'>{tour.title}</h1>
          <p className='text-sm line-clamp-2'>{tour.description}</p>
        </div>
        <div className='flex flex-row min-md:flex-col justify-between w-full min-md:w-fit'>
          <p className='w-max'>{tour.price_person} $</p>
          <p className='w-max'>Slots: {tour.available_slots}</p>
        </div>
      </div>
      <div className='flex justify-between pt-0.5 mt-1 border-t dark:border-white/20 border-black/20'>
        <div className='relative transition-transform hover:scale-105 hover:font-bold'>
          <h1>Country: {tour.country.country_name}</h1>
          <Link
            className='absolute left-0 top-0 w-full h-full'
            href={`/country/${tour.country_id}`}
            onClick={() => close()}
          />
        </div>
        <div className='relative transition-transform hover:scale-105 hover:font-bold'>
          <h1>Hotel: {tour.hotel.hotel_name}</h1>
          <Link
            className='absolute left-0 top-0 w-full h-full'
            href={`/hotel/${tour.hotel_id}`}
            onClick={() => close()}
          />
        </div>
      </div>
    </li>
  );
}
