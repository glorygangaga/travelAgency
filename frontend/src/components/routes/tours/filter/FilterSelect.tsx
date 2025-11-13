import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useProviderContext } from '@/shared/lib/hook/useProvideContext';
import { FilterContext } from './Filter';
import { hotelService } from '@/services/hotel.service';
import { Select } from '@/components/ui/select/Select';
import { tourFoodOptions } from '@/store/tourOptions';

export function FilterSelect() {
  const t = useTranslations('FILTER');
  const { filters, control } = useProviderContext(FilterContext);

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
    <>
      <Controller
        name='country_id'
        control={control}
        rules={{ required: 'Choose a country' }}
        render={({ field }) => (
          <Select
            placeholder={t('COUNTRY')}
            options={countries}
            isLoading={loadingCountries}
            {...field}
            onClick={() => setEnabled((prev) => ({ ...prev, countries: true }))}
            value={field.value}
            onChange={field.onChange}
            isFull={true}
          />
        )}
      />
      <Controller
        name='hotel_id'
        control={control}
        rules={{ required: 'Choose a hotel' }}
        render={({ field }) => (
          <Select
            placeholder={t('HOTEL')}
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
            isFull={true}
          />
        )}
      />
      <Controller
        name='food'
        control={control}
        render={({ field }) => (
          <Select
            placeholder={t('FOOD')}
            options={tourFoodOptions}
            {...field}
            value={field.value || ''}
            onChange={field.onChange}
            isFull={true}
          />
        )}
      />
    </>
  );
}
