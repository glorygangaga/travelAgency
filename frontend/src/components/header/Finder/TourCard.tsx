import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HotelIcon, MapPin } from 'lucide-react';

import { useModal } from '@/components/ui/modal/ModalProvider';
import { FullTourData, TourTypeRes } from '@/shared/types/tour.types';

interface Props {
  tour: FullTourData | TourTypeRes;
}

export default function TourCard({ tour }: Props) {
  const t = useTranslations('TOUR');

  const { close } = useModal();
  return (
    <li className='relative p-2 flex gap-3 flex-col min-md:flex-row rounded-lg border border-black/20 dark:border-white/20 transition-transform'>
      <Link
        href={`/tour/${tour.tour_id}`}
        onClick={() => close()}
        className='absolute left-0 top-0 w-full h-full'
      />
      <div className='min-md:min-w-2/5  min-h-[160px] border flex justify-center items-center'>
        Image
      </div>
      <div className='flex flex-col'>
        <div className='flex justify-between min-md:items-center min-md:flex-row items-baseline flex-col'>
          <div>
            <h1 className='text-2xl font-bold'>{tour.title}</h1>
            <p className='text-sm line-clamp-2'>{tour.description}</p>
          </div>
          <div className='flex flex-row min-md:flex-col justify-between w-full min-md:w-fit'>
            <p className='w-max'>{tour.price_person} $</p>
            <p className='w-max'>
              {t('SLOTS')}: {tour.available_slots}
            </p>
          </div>
        </div>
        <div className='flex justify-between pt-1 mt-auto border-t dark:border-white/20 border-black/20'>
          <div className='flex gap-2 items-center relative group'>
            <MapPin className='group-hover:text-blue-600 transition-colors' />
            <span> {tour.country.country_name}</span>
            <Link
              className='absolute left-0 top-0 w-full h-full'
              href={`/country/${tour.country_id}`}
              onClick={() => close()}
            />
          </div>
          <div className='flex gap-2 items-center relative group'>
            <HotelIcon className='group-hover:text-blue-600 transition-colors' />
            <span>{tour.hotel.hotel_name}</span>
            <Link
              className='absolute left-0 top-0 w-full h-full'
              href={`/hotel/${tour.hotel_id}`}
              onClick={() => close()}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
