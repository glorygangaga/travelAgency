import dynamic from 'next/dynamic';

import { Loading } from '@/components/ui/loading/Loading';
import { FullTourData } from '@/shared/types/tour.types';

import './styles.css';

const TourCard = dynamic(() => import('@/components/header/Finder/TourCard'));

interface Props {
  searchLoading: boolean;
  searchData: FullTourData[] | undefined;
}

export function FinderTourList({ searchData, searchLoading }: Props) {
  return (
    <div className='relative'>
      {searchLoading ? (
        <div className='flex justify-center w-full absolute bottom-5 left-1/2 -translate-x-1/2'>
          <Loading />
        </div>
      ) : searchData && searchData.length > 0 ? (
        <ul className='mb-3 grid gap-2 max-h-calc min-md:max-h-[520px] overflow-y-auto overflow-x-hidden'>
          {searchData.map((tour) => (
            <TourCard key={tour.tour_id} tour={tour} />
          ))}
        </ul>
      ) : (
        searchData && <h1 className='text-center font-bold text-2xl'>Nothing found...</h1>
      )}
    </div>
  );
}
