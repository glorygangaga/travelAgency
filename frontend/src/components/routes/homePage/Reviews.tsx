'use client';

import { useQuery } from '@tanstack/react-query';
import { SwiperSlide } from 'swiper/react';
import { UserCircle } from 'lucide-react';

import { Loading } from '@/components/ui/loading/Loading';
import { reviewService } from '@/services/reviews.service';
import { CarouselChild } from '@/components/ui/carousel/CarouselChild';
import { LoadImage } from '@/components/ui/image/LoadImage';
import { StarRaiting } from '@/components/ui/StarRaiting/StarRaiting';

export function Reviews() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reviewsHome'],
    queryFn: () => reviewService.getReviewsForHomePage(5),
  });

  return (
    <section className='min-md:max-w-[calc(100svw-150px)] mx-auto'>
      {isLoading ? (
        <Loading />
      ) : data && data && data.length > 0 ? (
        <CarouselChild
          showButtons={false}
          children={data.map((review) => (
            <SwiperSlide
              key={review.review_id}
              className='bg-black/5 dark:bg-black/60 rounded-xl p-4 grid gap-3'
            >
              <div className='flex justify-between h-full'>
                <div className='flex gap-2'>
                  {review.user.image.image_id === -1 ? (
                    <UserCircle />
                  ) : (
                    <div className='w-7 h-7'>
                      <LoadImage className='rounded-full' image_id={review.user.image.image_id} />
                    </div>
                  )}
                  <h2>{review.user.username}</h2>
                </div>
                <StarRaiting rating={review.rating} />
              </div>
              <p>{review.comment}</p>
            </SwiperSlide>
          ))}
          delay={7000}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: {
              slidesPerView: 3,
            },
          }}
          allowTouch={true}
        />
      ) : (
        isError && (
          <div className='text-center mb-6'>
            <h1 className='text-4xl font-bold'>Something went wrong</h1>
            <p>Try reload page</p>
          </div>
        )
      )}
    </section>
  );
}
