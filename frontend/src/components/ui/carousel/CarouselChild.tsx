'use client';

import { useState, type ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';

import { Navigation, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { SwiperOptions } from 'swiper/types';

type Props = {
  classname?: string;
  delay?: number;
  children: ReactNode;
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
  disableOnInteraction?: boolean;
  sectionClassname?: string;
};

export function CarouselChild({
  classname = '',
  delay = 0,
  breakpoints = {},
  slidesPerView = 1,
  children,
  buttonCN = '',
  showButtons = true,
  loop = false,
  speed = 600,
  rtl = false,
  allowTouch = false,
  disableOnInteraction = true,
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
        autoplay={{ delay, pauseOnMouseEnter: true, disableOnInteraction }}
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
        {children}
      </Swiper>

      {showButtons ? (
        <>
          <button
            className={`btn-prev max-sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-[1] p-2 rounded-full ${
              buttonCN ? buttonCN : 'bg-black  text-white hover:bg-black/85'
            } transition-all hover:scale-105 disabled:opacity-0`}
            disabled={isActive.begin}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className={`btn-next max-sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-[1] p-2 rounded-full ${
              buttonCN ? buttonCN : 'bg-black  text-white hover:bg-black/85'
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
