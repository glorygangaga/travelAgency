import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';

import { TourResponseType } from '@/shared/types/tour.types';
import { SlidersHorizontal } from 'lucide-react';
import Pagination from '@/components/ui/pagination/Pagination';
import { useTranslations } from 'next-intl';

const TourCard = dynamic(() => import('@/components/header/Finder/TourCard'));

interface Props {
  data: TourResponseType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  pages: {
    pageNumber: number;
    pageSize: number;
  };
  setPages: React.Dispatch<
    React.SetStateAction<{
      pageNumber: number;
      pageSize: number;
    }>
  >;
}

export default function ToursList({ data, setIsOpen, pages, setPages }: Props) {
  const t = useTranslations('TOUR');

  return (
    <motion.div
      className='relative mx-auto'
      layout
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ rotate: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className='absolute left-0 top-0 flex justify-center items-center p-1.5 rounded-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 group transition-none border border-black/15 dark:border-white/15 dark:bg-white/5'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <SlidersHorizontal />
      </motion.button>
      <h1 className='text-center font-bold text-5xl mb-2'>{t('TOURS')}</h1>
      <ul className='max-w-6xl mx-auto grid min-sm:grid-cols-2 min-lg:grid-cols-3 gap-4 relative p-4 bg-white border border-black/20 dark:bg-black rounded-lg'>
        {data.tours.map((tour) => (
          <TourCard tour={tour} key={tour.tour_id} />
        ))}
      </ul>
      <Pagination pages={pages} setPages={setPages} total={data.total} />
    </motion.div>
  );
}
