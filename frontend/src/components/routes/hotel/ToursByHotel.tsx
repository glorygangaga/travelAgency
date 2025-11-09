'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { Loading } from '@/components/ui/loading/Loading';
import Pagination from '@/components/ui/pagination/Pagination';
import { tourService } from '@/services/tour.service';

const TourCard = dynamic(() => import('@/components/header/Finder/TourCard'));

interface Props {
  hotel_id: number;
}

export function ToursByHotel({ hotel_id }: Props) {
  const t = useTranslations('HOTEL');
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 9 });

  const { isLoading, data } = useQuery({
    queryKey: ['tours', pages],
    queryFn: () => tourService.getToursByHotelId({ hotel_id, ...pages }),
  });

  return (
    <div className='p-4 bg-white border border-black/20 dark:bg-black rounded-lg max-w-5xl mx-auto'>
      <h1 className='text-center font-bold text-3xl mb-2'>{t('Tours')}</h1>
      {isLoading ? (
        <div className='flex justify-center'>
          <Loading />
        </div>
      ) : (
        data &&
        data.tours.length > 0 && (
          <>
            <ul className='grid min-sm:grid-cols-2 min-lg:grid-cols-3 gap-4 relative '>
              {data.tours.map((tour) => (
                <TourCard tour={tour} key={tour.tour_id} />
              ))}
            </ul>
            <Pagination pages={pages} setPages={setPages} total={data.total} />
          </>
        )
      )}
    </div>
  );
}
