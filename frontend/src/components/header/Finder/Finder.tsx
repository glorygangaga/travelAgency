import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

import { FinderForm } from './FinderForm';
import { tourService } from '@/services/tour.service';
import { Loading } from '@/components/ui/loading/Loading';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { useDebounce } from '@/shared/lib/hook/useDebounce';

const TourCard = dynamic(() => import('@/components/header/Finder/TourCard'));

export function Finder() {
  const t = useTranslations('TOUR');
  const [query, setQuery] = useState<{ country_id: number; query: string }>({
    country_id: -1,
    query: '',
  });
  const debouncedQuery = useDebounce(query, 300);

  const { close } = useModal();

  const { data: countryData, isLoading: countryLoading } = useQuery({
    queryKey: ['toursList'],
    queryFn: () => tourService.getCountiesByDesc(5),
  });

  const { data: searchData, isLoading: searchLoading } = useQuery({
    queryKey: ['tours', debouncedQuery],
    queryFn: () => tourService.getToursByQuery(debouncedQuery),
    enabled: !!debouncedQuery.query || debouncedQuery.country_id !== -1,
  });

  return (
    <div className='grid gap-2 min-xl:w-2xl min-lg:w-lg min-md:max-w-md relative'>
      <FinderForm value={query} onChange={setQuery} />
      <div className='overflow-x-auto mb-2 relative'>
        <ul className='flex gap-2 flex-wrap'>
          {countryLoading ? (
            <div className='flex justify-center w-full absolute left-1/2 -translate-x-1/2 bottom-4'>
              <Loading />
            </div>
          ) : (
            countryData &&
            countryData.map((country) => (
              <li key={country.country_id}>
                <button
                  className={`p-2 min-w-12 rounded-lg border border-black/20 dark:border-white/20 transition-colors hover:bg-black/10 dark:hover:bg-white/20 ${
                    query.country_id === country.country_id ? 'bg-black/10 dark:bg-white/20' : ''
                  }`}
                  onClick={() =>
                    setQuery((prev) => ({
                      ...prev,
                      country_id: country.country_id === prev.country_id ? -1 : country.country_id,
                    }))
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
        <div className='overflow-y-auto overflow-x-hidden max-h-[450px] relative'>
          {searchLoading ? (
            <div className='flex justify-center w-full absolute bottom-5 left-1/2 -translate-x-1/2'>
              <Loading />
            </div>
          ) : searchData && searchData.length > 0 ? (
            <ul className='mb-3 grid gap-2'>
              {searchData.map((tour) => (
                <TourCard key={tour.tour_id} tour={tour} />
              ))}
            </ul>
          ) : (
            searchData && <h1 className='text-center font-bold text-2xl'>Nothing found...</h1>
          )}
        </div>
        <div className='flex justify-end'>
          <Link className='p-1 border-b' href={'/tours'} onClick={() => close()}>
            {t('SEE_ALL')}
          </Link>
        </div>
      </div>
    </div>
  );
}
