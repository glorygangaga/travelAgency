import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Control, UseFormRegister, UseFormReset } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { TourFilterType } from '@/shared/types/tour.types';

const Filter = dynamic(() => import('./Filter'));

interface Props {
  register: UseFormRegister<TourFilterType>;
  control: Control<TourFilterType, any, TourFilterType>;
  filters: TourFilterType;
  reset: UseFormReset<TourFilterType>;
  isOpen: boolean;
}

export default function filterMain({ register, control, filters, reset, isOpen }: Props) {
  const t = useTranslations('FILTER');

  return (
    <AnimatePresence mode='popLayout'>
      {isOpen && (
        <motion.div
          key='filter'
          className='sticky top-[84px] h-full p-4 bg-white border border-black/20 dark:bg-black rounded-lg w-full max-w-sm max-xl:max-w-[200px] max-xl:hidden'
        >
          <h1 className='text-center text-2xl font-bold'>{t('FILTER')}</h1>
          <Filter register={register} control={control} filters={filters} reset={reset} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
