'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import Pagination from '@/components/ui/pagination/Pagination';
import { hotelService } from '@/services/hotel.service';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { TableSkeleton } from '@/components/ui/table/TableSkeleton';

const HotelList = dynamic(() => import('./HotelList'));
const HotelCreate = dynamic(() => import('./HotelCreate'));

export function Hotel() {
  const { open } = useModal();
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 15 });

  const { data, isLoading } = useQuery({
    queryKey: ['hotels', pages.pageNumber],
    queryFn: () => hotelService.getHotels(pages),
  });

  return (
    <section>
      {isLoading ? (
        <TableSkeleton
          skeleton={{ isLoading, countRows: 5 }}
          names={['Hotel', 'Category', 'Description', 'Country', '']}
        />
      ) : data && data.hotel && data.hotel.length > 0 ? (
        <>
          <HotelList data={data.hotel} />
          <Pagination pages={pages} setPages={setPages} total={data.total} />
        </>
      ) : (
        <div className='grid justify-items-center gap-3 font-bold'>
          <h1 className='text-5xl text-center pt-20'>There is no hotels in data</h1>
          <button
            className='bg-white text-black p-2 rounded-lg text-2xl'
            onClick={() => open(<HotelCreate />)}
          >
            Create hotel
          </button>
        </div>
      )}
    </section>
  );
}
