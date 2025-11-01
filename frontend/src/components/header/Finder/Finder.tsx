import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { FinderForm } from './FinderForm';
import { tourService } from '@/services/tour.service';
import { Loading } from '@/components/ui/loading/Loading';

export function Finder() {
  const [part, setPart] = useState<string>('');

  const { data, isLoading } = useQuery({
    queryKey: ['toursList'],
    queryFn: () => tourService.getCountiesByDesc(5),
  });

  return (
    <div className='grid gap-2'>
      <FinderForm />
      <div className='overflow-x-auto pb-4'>
        <ul className='flex gap-2'>
          {isLoading ? (
            <div className='flex justify-center w-full'>
              <Loading />
            </div>
          ) : (
            data &&
            data.map((country) => (
              <li key={country.country_id}>
                <button
                  className={`p-2 min-w-12 rounded-lg border border-black/20 dark:border-white/20 transition-colors hover:bg-black/10 dark:hover:bg-white/20 ${
                    part === country.country_name ? 'bg-black/10 dark:bg-white/20' : ''
                  }`}
                  onClick={() =>
                    setPart((prev) => (country.country_name === prev ? '' : country.country_name))
                  }
                >
                  {country.country_name}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      <div></div>
    </div>
  );
}
