'use client';

import { useQuery } from '@tanstack/react-query';

import { useUserStore } from '@/store/userStore';
import { tourService } from '@/services/tour.service';
import { Loading } from '@/components/ui/loading/Loading';
import TourCard from '@/components/header/Finder/TourCard';

export function FavoriteList() {
  const { favorites } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ['tour', favorites],
    queryFn: () => tourService.getToursByIds(favorites),
    enabled: !!favorites.length,
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : data ? (
        <ul className='grid min-sm:grid-cols-2 gap-4 rounded-lg'>
          {data.map((tour) => (
            <TourCard key={tour.tour_id} tour={tour} />
          ))}
        </ul>
      ) : (
        <div className='flex justify-center my-7'>
          <h1 className='text-center text-4xl font-bold'>There is no favorites tours</h1>
        </div>
      )}
    </>
  );
}
