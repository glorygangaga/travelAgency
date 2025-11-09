'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

import { countryService } from '@/services/country.service';
import Pagination from '@/components/ui/pagination/Pagination';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { TableSkeleton } from '@/components/ui/table/TableSkeleton';

const CountryList = dynamic(() => import('./CountryList'));
const CountryCreate = dynamic(() => import('./CountryCreate'));

export function Country() {
  const { open } = useModal();
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 30 });

  const { data, isLoading } = useQuery({
    queryKey: ['countries', pages.pageNumber],
    queryFn: () => countryService.getCountries(pages),
  });

  return (
    <section className='px-4'>
      {isLoading ? (
        <div className='max-w-5xl mx-auto'>
          <TableSkeleton
            skeleton={{ isLoading, countRows: 5 }}
            names={['Name', 'discription', '']}
          />
        </div>
      ) : data && data.countries && data.countries.length > 0 ? (
        <>
          <CountryList data={data} />
          <Pagination pages={pages} setPages={setPages} total={data.total} />
        </>
      ) : (
        <div className='grid justify-items-center gap-3 font-bold'>
          <h1 className='text-5xl text-center pt-20'>There is no countries in data</h1>
          <button
            className='bg-white text-black p-2 rounded-lg text-2xl'
            onClick={() => open(<CountryCreate />)}
          >
            Create country
          </button>
        </div>
      )}
    </section>
  );
}
