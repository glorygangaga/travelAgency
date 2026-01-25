'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { SwiperOptions } from 'swiper/types';
import { LoadImage } from '../image/LoadImage';

type Props = {
  images: { image_id: number }[];
  classname?: string;
  delay?: number;
  slidesPerView?: number | 'auto';
  breakpoints?: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };
  buttonCN?: string;
  showButtons?: boolean;
  loop?: boolean;
  speed?: number;
  rtl?: boolean;
  allowTouch?: boolean;
  sectionClassname?: string;
};

export function CarouselImage({
  classname = '',
  delay = 0,
  breakpoints = {},
  slidesPerView = 1,
  buttonCN = '',
  showButtons = true,
  loop = false,
  speed = 600,
  rtl = false,
  allowTouch = false,
  images = [],
  sectionClassname = '',
}: Props) {
  const [isActive, setIsActive] = useState({ begin: false, end: false });

  return (
    <section className={`relative mb-7 w-full mx-auto overflow-hidden ${sectionClassname}`}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={slidesPerView ? slidesPerView : 1}
        navigation={{
          nextEl: '.btn-next',
          prevEl: '.btn-prev',
        }}
        speed={speed}
        allowTouchMove={allowTouch}
        autoplay={delay ? { delay, pauseOnMouseEnter: true } : false}
        className={`w-full ${classname}`}
        breakpoints={breakpoints}
        onSlideChange={(swiper) => {
          setIsActive({
            begin: swiper.isBeginning,
            end: swiper.isEnd,
          });
        }}
        loop={loop}
        dir={rtl ? 'rtl' : 'ltr'}
      >
        {images.map((image) => (
          <SwiperSlide key={image.image_id}>
            <LoadImage image_id={image.image_id} className={`rounded-lg ${classname}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      {showButtons ? (
        <>
          <button
            className={`btn-prev max-sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-[1] p-2 rounded-full ${
              buttonCN
                ? buttonCN
                : 'bg-black dark:bg-white dark:text-black text-white hover:bg-black/85'
            } transition-all hover:scale-105 disabled:opacity-0`}
            disabled={isActive.begin}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className={`btn-next max-sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-[1] p-2 rounded-full ${
              buttonCN
                ? buttonCN
                : 'bg-black dark:bg-white dark:text-black text-white hover:bg-black/85'
            } transition-all hover:scale-105 disabled:opacity-0`}
            disabled={isActive.end}
          >
            <ArrowRight size={20} />
          </button>
        </>
      ) : null}
    </section>
  );
}
