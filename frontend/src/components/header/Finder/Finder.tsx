import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { FinderForm } from './FinderForm';
import { tourService } from '@/services/tour.service';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { useDebounce } from '@/shared/lib/hook/useDebounce';
import { FinderCountry } from './FinderCountry';
import { FinderTourList } from './FinderTourList';

export function Finder() {
  const t = useTranslations('TOUR');
  const { close } = useModal();

  const [query, setQuery] = useState<{ country_id: number; query: string }>({
    country_id: -1,
    query: '',
  });
  const debouncedQuery = useDebounce(query, 300);

  const { data: searchData, isLoading: searchLoading } = useQuery({
    queryKey: ['tours', debouncedQuery],
    queryFn: () => tourService.getToursByQuery(debouncedQuery),
    enabled: !!debouncedQuery.query || debouncedQuery.country_id !== -1,
  });

  return (
    <div className='grid gap-2 min-xl:w-2xl min-lg:w-lg min-md:max-w-md relative'>
      <FinderForm value={query} onChange={setQuery} />
      <FinderCountry query={query} setQuery={setQuery} />
      <div>
        <FinderTourList searchLoading={searchLoading} searchData={searchData} />
        <div className='flex justify-end'>
          <Link className='p-1 border-b' href={'/tours'} onClick={() => close()}>
            {t('SEE_ALL')}
          </Link>
        </div>
      </div>
    </div>
  );
}
