'use client';

import { useQuery } from '@tanstack/react-query';

import { imageService } from '@/services/image.service';
import { GallaryImage } from './GallaryImage';

export function GalleryCountry() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['images', 'country'],
    queryFn: () => imageService.GetImagesByType(10, 'country'),
  });

  return (
    <article className=''>
      <GallaryImage
        data={data}
        isError={isError}
        isLoading={isLoading}
        slidesPerView={1}
        speed={2000}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1280: { slidesPerView: 6 },
        }}
      />
    </article>
  );
}
