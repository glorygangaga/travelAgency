'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

import { tourService } from '@/services/tour.service';
import { ToursSkeleton } from './ToursSkeleton';
import { TourFilterType } from '@/shared/types/tour.types';
import { useDebounce } from '@/shared/lib/hook/useDebounce';
import { useModal } from '@/components/ui/modal/ModalProvider';

const ToursList = dynamic(() => import('./ToursList'));
const FilterMain = dynamic(() => import('./filter/filterMain'));
const Filter = dynamic(() => import('./filter/Filter'));

export function Tours() {
  const { open } = useModal();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 12 });
  const { register, watch, control, reset } = useForm<TourFilterType>({
    mode: 'onSubmit',
  });

  const watched = watch();
  const filters = useMemo(() => {
    setPages((prev) => ({ ...prev, pageNumber: 1 }));
    return watched;
  }, [JSON.stringify(watched)]);

  const debouncedData = useDebounce(filters, 500);

  const { isLoading, data } = useQuery({
    queryKey: ['tours', pages, debouncedData],
    queryFn: () => tourService.getAllToursByQuery({ ...debouncedData, ...pages }),
  });

  useEffect(() => {
    if (isOpen && window.window.innerWidth < 1280) {
      open(<Filter register={register} control={control} filters={filters} reset={reset} />);
      setIsOpen(false);
    }
  }, [isOpen]);

  return (
    <section className='mb-10'>
      <div className='w-full flex gap-5'>
        <FilterMain
          register={register}
          control={control}
          filters={filters}
          reset={reset}
          isOpen={isOpen}
        />
        {isLoading ? (
          <ToursSkeleton />
        ) : (
          data &&
          data.tours.length > 0 && (
            <ToursList data={data} pages={pages} setPages={setPages} setIsOpen={setIsOpen} />
          )
        )}
      </div>
    </section>
  );
}
