'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import Pagination from '@/components/ui/pagination/Pagination';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { tourService } from '@/services/tour.service';
import { TableSkeleton } from '@/components/ui/table/TableSkeleton';

const TourCreate = dynamic(() => import('./TourCreate'));
const TourList = dynamic(() => import('./TourList'), {
  loading: () => (
    <TableSkeleton
      skeleton={{ isLoading: true, countRows: 5 }}
      names={[
        'Title',
        'Description',
        'Hotel name',
        'Country name',
        'Start date',
        'End date',
        'Tour type',
        'Food type',
        'Price person',
        'Available slots',
        '',
      ]}
    />
  ),
});

export function Tour() {
  const { open } = useModal();
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 15 });

  const { data, isLoading } = useQuery({
    queryKey: ['tours', pages.pageNumber],
    queryFn: () => tourService.getTours(pages),
  });

  return (
    <section>
      {isLoading ? (
        <TableSkeleton
          skeleton={{ isLoading, countRows: 5 }}
          names={[
            'Title',
            'Description',
            'Hotel name',
            'Country name',
            'Start date',
            'End date',
            'Tour type',
            'Food type',
            'Price person',
            'Available slots',
            '',
          ]}
        />
      ) : data && data.tours && data.tours.length > 0 ? (
        <>
          <TourList data={data.tours} />
          <Pagination pages={pages} setPages={setPages} total={data.total} />
        </>
      ) : (
        <div className='grid justify-items-center gap-3 font-bold'>
          <h1 className='text-5xl text-center pt-20'>There is no tours in data</h1>
          <button
            className='bg-white text-black p-2 rounded-lg text-2xl'
            onClick={() => open(<TourCreate />)}
          >
            Create tour
          </button>
        </div>
      )}
    </section>
  );
}
