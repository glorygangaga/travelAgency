'use client';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

import { Loading } from '@/components/ui/loading/Loading';
import Pagination from '@/components/ui/pagination/Pagination';
import { tourService } from '@/services/tour.service';

export function Tours() {
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 10 });
  const { isLoading, data } = useQuery({
    queryKey: ['tours', pages.pageNumber],
    queryFn: () => tourService.getTours(pages),
  });

  return (
    <section className='mb-10'>
      <h1 className='text-center font-bold text-5xl mb-2'>Tours</h1>
      {isLoading ? (
        <Loading />
      ) : (
        data &&
        data.tours.length > 0 && (
          <>
            <ul className='grid grid-cols-2 gap-3 relative'>
              {data.tours.map((tour) => (
                <li key={tour.tour_id} className='border rounded-lg p-3'>
                  <h2>{tour.title}</h2>
                  <p>{tour.description}</p>
                  <Link
                    href={`/tour/${tour.tour_id}`}
                    className='absolute left-0 top-0 w-full h-full'
                  />
                </li>
              ))}
            </ul>
            <Pagination pages={pages} setPages={setPages} total={data.total} />
          </>
        )
      )}
    </section>
  );
}
