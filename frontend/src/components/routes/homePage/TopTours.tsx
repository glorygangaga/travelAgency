'use client';

import { useQuery } from '@tanstack/react-query';
import { SwiperSlide } from 'swiper/react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Loading } from '@/components/ui/loading/Loading';
import { tourService } from '@/services/tour.service';
import { CarouselChild } from '@/components/ui/carousel/CarouselChild';
import { LoadImage } from '@/components/ui/image/LoadImage';

export function TopTours() {
  const t = useTranslations('HOME');
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tourswithimages'],
    queryFn: () => tourService.getTourWithImages(5),
  });

  return (
    <>
      <section className='flex justify-center min-md:max-w-[calc(100svw-150px)] mx-auto relative'>
        {isLoading ? (
          <Loading />
        ) : data && data.length > 0 ? (
          <CarouselChild
            delay={7000}
            sectionClassname='max-h-[500px]'
            children={data.map((tour) => (
              <SwiperSlide key={tour.tour_id}>
                <div className='group'>
                  <LoadImage image_id={tour.image_id} className='rounded-lg max-h-[500px]' />
                  <div className='absolute grid text-white rounded-b-lg left-0 bottom-0 w-full max-md:mb-0 group-hover:mb-0 -mb-12 transition-all bg-gradient-to-t from-black to-transparent h-40 z-10 px-11 pt-11 text-4xl font-bold'>
                    <span>{tour.title}</span>
                    <button
                      className='text-lg flex gap-2 items-center w-fit'
                      onClick={() => router.push(`/tour/${tour.tour_id}`)}
                    >
                      {t('CHOOSE')}
                      <span>
                        <ArrowRight />
                      </span>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
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
      <section className='flex justify-center mb-6'>
        <button
          onClick={() => router.push('/tours')}
          className='relative p-0.5 mb-7 inline-flex items-center justify-center font-bold overflow-hidden transition-all hover:scale-[102%] rounded-md'
        >
          <span className='w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute'></span>
          <span className='relative px-6 py-3 transition-all ease-out rounded-md duration-400'>
            <span className='relative text-white'>{t('BUTTON')}</span>
          </span>
        </button>
      </section>
    </>
  );
}
