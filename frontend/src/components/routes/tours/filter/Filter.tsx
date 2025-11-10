import { Control, Controller, UseFormRegister, UseFormReset } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpNarrowWide, ArrowUpWideNarrow } from 'lucide-react';
import { useState } from 'react';

import { TourFilterType } from '@/shared/types/tour.types';
import { Select } from '@/components/ui/select/Select';
import { tourFoodOptions } from '@/store/tourOptions';
import { Input } from '@/components/ui/Input';
import { OnlyNumbers, OnlyNumbersWithDelim } from '@/shared/lib/functions/OnlyNumbers';
import { hotelService } from '@/services/hotel.service';
import { ActiveFilter } from './ActiveFilter';
import { DoubleRange } from '@/components/ui/doubleRange/DoubleRange';
import Calendar from '@/components/ui/calendar/Calendar';

interface Props {
  register: UseFormRegister<TourFilterType>;
  control: Control<TourFilterType, any, TourFilterType>;
  filters: TourFilterType;
  reset: UseFormReset<TourFilterType>;
}

export default function Filter({ register, control, filters, reset }: Props) {
  const [enabled, setEnabled] = useState({ hotels: false, countries: false });

  const { data: countries, isLoading: loadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: () => hotelService.getCountriesForSelect(),
    enabled: enabled.countries,
  });

  const { data: hotels, isLoading: loadingHotels } = useQuery({
    queryKey: ['hotels', filters.country_id],
    queryFn: () => hotelService.getHotelsByCountriesOptions(filters.country_id || 0),
    enabled: enabled.hotels && !!countries?.length && !!filters.country_id,
  });

  return (
    <div className=''>
      <ActiveFilter filters={filters} reset={reset} />
      <form className='grid gap-3'>
        <div className='flex gap-2'>
          <button
            type='button'
            className={`flex justify-center items-center p-1.5 rounded-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 group transition-none border border-black/15 dark:border-white/15 dark:bg-white/5 ${
              filters.filterByPriceMin ? 'bg-black/15 dark:bg-white/20' : ''
            }`}
            onClick={() =>
              reset((prev) => ({
                ...prev,
                filterByPriceMin: prev.filterByPriceMin ? undefined : true,
                filterByPriceMax: prev.filterByPriceMax
                  ? prev.filterByPriceMin
                    ? true
                    : undefined
                  : undefined,
              }))
            }
          >
            <ArrowUpNarrowWide />
          </button>
          <button
            type='button'
            className={`flex justify-center items-center p-1.5 rounded-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 group transition-none border border-black/15 dark:border-white/15 dark:bg-white/5 ${
              filters.filterByPriceMax ? 'bg-black/15 dark:bg-white/20' : ''
            }`}
            onClick={() =>
              reset((prev) => ({
                ...prev,
                filterByPriceMax: prev.filterByPriceMax ? undefined : true,
                filterByPriceMin: prev.filterByPriceMin
                  ? prev.filterByPriceMax
                    ? true
                    : undefined
                  : undefined,
              }))
            }
          >
            <ArrowUpWideNarrow />
          </button>
        </div>
        <Input placeholder='Find a tour' className='w-fit' {...register('q')} id='query' />
        <Controller
          name='country_id'
          control={control}
          rules={{ required: 'Choose a country' }}
          render={({ field }) => (
            <Select
              placeholder='Country select'
              options={countries}
              isLoading={loadingCountries}
              {...field}
              onClick={() => setEnabled((prev) => ({ ...prev, countries: true }))}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name='hotel_id'
          control={control}
          rules={{ required: 'Choose a hotel' }}
          render={({ field }) => (
            <Select
              placeholder='Hotel select'
              options={hotels}
              isLoading={loadingHotels}
              onClick={() => {
                setEnabled((prev) => ({ ...prev, hotels: true }));
              }}
              {...field}
              value={field.value}
              onChange={field.onChange}
              error='First choose a country'
              showError={enabled.hotels && !enabled.countries && !filters.country_id}
              disabled={!filters.country_id}
            />
          )}
        />
        <Controller
          name='food'
          control={control}
          render={({ field }) => (
            <Select
              placeholder='Food type'
              options={tourFoodOptions}
              {...field}
              value={field.value || ''}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          name='minSlots'
          control={control}
          render={({ field }) => (
            <Input
              placeholder='Min slots'
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
          <h1>Price ($)</h1>
          <div className='flex gap-2'>
            <Controller
              name='minPrice'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='Min'
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
                    if (+data >= maxval) data = String(maxval);
                    field.onChange(data);
                  }}
                />
              )}
            />
            <Controller
              name='maxPrice'
              control={control}
              render={({ field }) => (
                <Input
                  placeholder='Max'
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
          <DoubleRange min={0} max={3000} />
        </div>
        <div className=''>
          <h1>Date</h1>
          <div className='grid gap-3 justify-items-center'>
            <div className='flex gap-2'>
              <Controller
                name='minDateStart'
                control={control}
                render={({ field }) => (
                  <Input
                    type='date'
                    placeholder='Min'
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
              <Controller
                name='maxDateEnd'
                control={control}
                render={({ field }) => (
                  <Input
                    type='date'
                    className='w-fit'
                    placeholder='Max'
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
            />
          </div>
        </div>
      </form>
    </div>
  );
}
