'use client';

import { useQuery } from '@tanstack/react-query';

import { imageService } from '@/services/image.service';
import { GallaryImage } from './GallaryImage';

export function GalleryTour() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['images', 'tour'],
    queryFn: () => imageService.GetImagesByType(10, 'tour'),
  });

  return (
    <article className=''>
      <GallaryImage
        data={data}
        isError={isError}
        isLoading={isLoading}
        slidesPerView={1}
        delay={900}
        speed={2000}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
        }}
      />
    </article>
  );
}
