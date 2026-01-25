'use client';

import { useQuery } from '@tanstack/react-query';

import { imageService } from '@/services/image.service';
import { GallaryImage } from './GallaryImage';

export function GalleryHotel() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['images', 'hotel'],
    queryFn: () => imageService.GetImagesByType(10, 'hotel'),
  });

  return (
    <article className=''>
      <GallaryImage
        data={data}
        isError={isError}
        isLoading={isLoading}
        slidesPerView={2}
        speed={1500}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
        }}
        rtl={false}
      />
    </article>
  );
}
