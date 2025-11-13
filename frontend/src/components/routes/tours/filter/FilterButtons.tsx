import { ArrowUpNarrowWide, ArrowUpWideNarrow } from 'lucide-react';
import { FilterContext } from './Filter';
import { useProviderContext } from '@/shared/lib/hook/useProvideContext';

export function FilterButtons() {
  const { filters, reset } = useProviderContext(FilterContext);

  return (
    <div className='flex gap-2'>
      <button
        type='button'
        className={`flex justify-center items-center p-1.5 rounded-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 group transition-none border border-black/15 dark:border-white/15 dark:bg-white/5 ${
          filters.filterByPriceMin ? 'bg-black/15 dark:bg-white/20' : ''
        }`}
        onClick={() =>
          reset((prev) => ({
            ...prev,
            filterByPriceMin: prev.filterByPriceMin ? undefined : true,
            filterByPriceMax: prev.filterByPriceMax
              ? prev.filterByPriceMin
                ? true
                : undefined
              : undefined,
          }))
        }
      >
        <ArrowUpNarrowWide />
      </button>
      <button
        type='button'
        className={`flex justify-center items-center p-1.5 rounded-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 group transition-none border border-black/15 dark:border-white/15 dark:bg-white/5 ${
          filters.filterByPriceMax ? 'bg-black/15 dark:bg-white/20' : ''
        }`}
        onClick={() =>
          reset((prev) => ({
            ...prev,
            filterByPriceMax: prev.filterByPriceMax ? undefined : true,
            filterByPriceMin: prev.filterByPriceMin
              ? prev.filterByPriceMax
                ? true
                : undefined
              : undefined,
          }))
        }
      >
        <ArrowUpWideNarrow />
      </button>
    </div>
  );
}
