import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { FinderForm } from './FinderForm';
import { tourService } from '@/services/tour.service';
import { Loading } from '@/components/ui/loading/Loading';
import { useModal } from '@/components/ui/modal/ModalProvider';

export function Finder() {
  const { close } = useModal();
  const [part, setPart] = useState<number>(-1);

  const { data: countryData, isLoading: countryLoading } = useQuery({
    queryKey: ['toursList'],
    queryFn: () => tourService.getCountiesByDesc(5),
  });

  const { data: toursData, isLoading: toursLoading } = useQuery({
    queryKey: ['tours', part],
    queryFn: () => tourService.getToursByCountry(part),
    enabled: part >= 0,
  });

  return (
    <div className='grid gap-2 min-xl:w-2xl min-lg:w-lg min-md:max-w-md'>
      <FinderForm />
      <div className='overflow-x-auto pb-4'>
        <ul className='flex gap-2'>
          {countryLoading ? (
            <div className='flex justify-center w-full'>
              <Loading />
            </div>
          ) : (
            countryData &&
            countryData.map((country) => (
              <li key={country.country_id}>
                <button
                  className={`p-2 min-w-12 rounded-lg border border-black/20 dark:border-white/20 transition-colors hover:bg-black/10 dark:hover:bg-white/20 ${
                    part === country.country_id ? 'bg-black/10 dark:bg-white/20' : ''
                  }`}
                  onClick={() =>
                    setPart((prev) => (country.country_id === prev ? -1 : country.country_id))
                  }
                >
                  {country.country_name}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      <div>
        {toursLoading ? (
          <div className='flex justify-center w-full'>
            <Loading />
          </div>
        ) : (
          toursData && (
            <>
              <ul className='mb-3'>
                {toursData.map((tour) => (
                  <li
                    key={tour.tour_id}
                    className='relative p-2 rounded-lg border border-black/20 dark:border-white/20 flex justify-between items-center'
                  >
                    <Link
                      href={`/tour/${tour.tour_id}`}
                      onClick={() => close()}
                      className='absolute left-0 top-0 w-full h-full'
                    />
                    <div>
                      <h1 className='text-2xl font-bold'>{tour.title}</h1>
                      <p className='text-sm line-clamp-3'>{tour.description}</p>
                    </div>
                    <div>
                      <p>{tour.price_person} &#8381;</p>
                      <p>Slots: {tour.available_slots}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='flex justify-end'>
                <Link className='p-1 border-b' href={'/tours'} onClick={() => close()}>
                  See all tours
                </Link>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}
