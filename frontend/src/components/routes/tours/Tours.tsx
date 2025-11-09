'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/pagination/Pagination';
import { tourService } from '@/services/tour.service';
import { ToursSkeleton } from './ToursSkeleton';
import dynamic from 'next/dynamic';

const TourCard = dynamic(() => import('@/components/header/Finder/TourCard'));

export function Tours() {
  const t = useTranslations('TOUR');
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 12 });
  const { isLoading, data } = useQuery({
    queryKey: ['tours', pages.pageNumber],
    queryFn: () => tourService.getTours(pages),
  });

  return (
    <section className='mb-10 max-w-6xl mx-auto'>
      <h1 className='text-center font-bold text-5xl mb-2'>{t('TOURS')}</h1>
      {isLoading ? (
        <ToursSkeleton />
      ) : (
        data &&
        data.tours.length > 0 && (
          <>
            <ul className='grid min-sm:grid-cols-2 min-lg:grid-cols-3 gap-4 relative p-4 bg-white border border-black/20 dark:bg-black rounded-lg'>
              {data.tours.map((tour) => (
                <TourCard tour={tour} key={tour.tour_id} />
              ))}
            </ul>
            <Pagination pages={pages} setPages={setPages} total={data.total} />
          </>
        )
      )}
    </section>
  );
}
