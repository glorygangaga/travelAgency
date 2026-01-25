import { SwiperSlide } from 'swiper/react';

import { CarouselChild } from '@/components/ui/carousel/CarouselChild';
import { LoadImage } from '@/components/ui/image/LoadImage';
import { Loading } from '@/components/ui/loading/Loading';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { SwiperOptions } from 'swiper/types';

interface Props {
  data: { image_id: number }[] | undefined;
  isError: boolean;
  isLoading: boolean;
  slidesPerView: number;
  speed: number;
  breakpoints: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };
  delay?: number;
  rtl?: boolean;
}

export function GallaryImage({
  isLoading,
  isError,
  data,
  slidesPerView,
  speed,
  breakpoints,
  delay,
  rtl = true,
}: Props) {
  const { open } = useModal();
  return (
    <article className='max-w-7xl mx-auto'>
      {isLoading ? (
        <Loading />
      ) : data && data.length > 0 ? (
        <CarouselChild
          rtl={rtl}
          loop={true}
          allowTouch={false}
          showButtons={false}
          slidesPerView={slidesPerView}
          speed={speed}
          breakpoints={breakpoints}
          delay={delay}
          children={
            <>
              {data.map((image) => (
                <SwiperSlide key={image.image_id}>
                  <div className='relative'>
                    <button
                      className='absolute left-0 top-0 w-full h-full'
                      onClick={() =>
                        open(
                          <div className='flex justify-center items-center h-full'>
                            <LoadImage
                              image_id={image.image_id}
                              className='relative rounded-md max-h-[calc(100svh-350px)]'
                            />
                          </div>,
                        )
                      }
                    />
                    <LoadImage
                      image_id={image.image_id}
                      className='rounded-md min-h-[200px] w-min max-h-[200px]'
                    />
                  </div>
                </SwiperSlide>
              ))}
            </>
          }
        />
      ) : (
        isError && (
          <div className='text-center mb-6'>
            <h1 className='text-4xl font-bold'>Something went wrong</h1>
            <p>Try reload page</p>
          </div>
        )
      )}
    </article>
  );
}
