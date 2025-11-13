import { AnimatePresence, motion } from 'framer-motion';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/Input';
import { OnlyNumbers, OnlyNumbersWithDelim } from '@/shared/lib/functions/OnlyNumbers';
import { useProviderContext } from '@/shared/lib/hook/useProvideContext';
import { FilterContext } from './Filter';
import { DoubleRange } from '@/components/ui/doubleRange/DoubleRange';
import Calendar from '@/components/ui/calendar/Calendar';

export function FilterAdditional() {
  const t = useTranslations('FILTER.ADDITIONAL');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { filters, control, reset } = useProviderContext(FilterContext);

  return (
    <>
      <div>
        <button
          type='button'
          className='flex justify-between w-full p-2 bg-black/10 dark:bg-white/10 rounded-lg transition-colors hover:bg-black/20 dark:hover:bg-white/20 font-bold'
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span>{t('ADDITIONAL')}</span>
          <ChevronRight className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key='additional-filter'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'
          >
            <Controller
              name='minSlots'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder={t('SLOTS')}
                  name='Min_slots'
                  className='w-fit'
                  value={field.value || ''}
                  onChange={(e) => {
                    field.onChange(OnlyNumbers(e.target.value, String(field.value) || ''));
                  }}
                />
              )}
            />
            <div className='grid gap-2'>
              <h1>{t('PRICE')}</h1>
              <div className='flex gap-2 items-center'>
                <Controller
                  name='minPrice'
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder={t('MIN')}
                      name='minPrice'
                      className='w-fit'
                      value={field.value || ''}
                      onChange={(e) => {
                        let data = OnlyNumbersWithDelim(
                          e.target.value,
                          String(field.value) || '',
                          0,
                          3000,
                        );
                        const maxval = filters.maxPrice || 0;
                        if (+data >= maxval && maxval !== 0) data = String(maxval);
                        field.onChange(data);
                      }}
                    />
                  )}
                />
                <span>—</span>
                <Controller
                  name='maxPrice'
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder={t('MAX')}
                      name='maxPrice'
                      className='w-fit'
                      value={field.value || ''}
                      onChange={(e) => {
                        let data = OnlyNumbersWithDelim(
                          e.target.value,
                          String(field.value) || '',
                          0,
                          3000,
                        );
                        const minVal = filters.minPrice || 0;
                        if (minVal > +data) data = String(minVal);
                        field.onChange(data);
                      }}
                    />
                  )}
                />
              </div>
              <div className='w-11/12 mx-auto'>
                <DoubleRange
                  min={0}
                  max={3000}
                  value={{ minValue: filters.minPrice, maxValue: filters.maxPrice }}
                  onChange={(v) => {
                    reset((prev) => ({ ...prev, minPrice: v.minValue, maxPrice: v.maxValue }));
                  }}
                />
              </div>
            </div>
            <div>
              <h1>{t('Date')}</h1>
              <div className='grid gap-3 justify-items-center'>
                <div className='flex gap-2 items-center'>
                  <Controller
                    name='minDateStart'
                    control={control}
                    render={({ field }) => (
                      <Input
                        type='date'
                        className='w-fit'
                        id='minDate'
                        min={new Date().toISOString().split('T')[0]}
                        max={filters.maxDateEnd || ''}
                        value={field.value || ''}
                        onChange={(e) => {
                          const date = new Date(e.target.value).toISOString().split('T')[0];
                          field.onChange(date);
                        }}
                      />
                    )}
                  />
                  <span>—</span>
                  <Controller
                    name='maxDateEnd'
                    control={control}
                    render={({ field }) => (
                      <Input
                        type='date'
                        className='w-fit'
                        id='maxDate'
                        min={filters.minDateStart || new Date().toISOString().split('T')[0]}
                        value={field.value || ''}
                        onChange={(e) => {
                          const date = new Date(e.target.value).toISOString().split('T')[0];
                          field.onChange(date);
                        }}
                      />
                    )}
                  />
                </div>
                <Calendar
                  start_date={filters.minDateStart || new Date().toISOString().split('T')[0]}
                  end_date={filters.maxDateEnd || new Date().toISOString().split('T')[0]}
                  onChange={(v) => {
                    reset((prev) => ({ ...prev, minDateStart: v.minDate, maxDateEnd: v.maxDate }));
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
