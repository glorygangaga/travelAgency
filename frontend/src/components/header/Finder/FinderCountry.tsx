import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { tourService } from '@/services/tour.service';
import { Loading } from '@/components/ui/loading/Loading';

interface Props {
  query: {
    country_id: number;
    query: string;
  };
  setQuery: Dispatch<
    SetStateAction<{
      country_id: number;
      query: string;
    }>
  >;
}

export function FinderCountry({ query, setQuery }: Props) {
  const { data: countryData, isLoading: countryLoading } = useQuery({
    queryKey: ['toursList'],
    queryFn: () => tourService.getCountiesByDesc(5),
  });

  return (
    <div className='overflow-x-auto mb-2 relative'>
      <ul className='flex gap-2 overflow-x-auto'>
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
  );
}
