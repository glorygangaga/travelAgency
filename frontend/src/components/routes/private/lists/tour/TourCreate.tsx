import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/select/Select';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';
import { tourService } from '@/services/tour.service';
import { hotelService } from '@/services/hotel.service';
import { TourCreateType } from '@/shared/types/tour.types';
import { OnlyNumbers } from '@/shared/lib/functions/OnlyNumbers';
import { tourFoodOptions } from '@/store/tourOptions';
import { useModal } from '@/components/ui/modal/ModalProvider';

export default function TourCreate() {
  const { close } = useModal();
  const [enabled, setEnabled] = useState({ hotels: false, countries: false });
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<TourCreateType>({ mode: 'onSubmit' });

  const { data: countries, isLoading: loadingCountries } = useQuery({
    queryKey: ['countries'],
    queryFn: () => hotelService.getCountriesForSelect(),
    enabled: enabled.countries,
  });

  const { data: hotels, isLoading: loadingHotels } = useQuery({
    queryKey: ['hotels', watch('country_id')],
    queryFn: () => hotelService.getHotelsByCountriesOptions(+watch('country_id')),
    enabled: enabled.hotels && !!countries?.length && !!watch('country_id'),
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ['tours'],
    mutationFn: (data: TourCreateType) => tourService.createTour(data),
    onSuccess() {
      close();
      queryClient.invalidateQueries({
        queryKey: ['tour'],
      });
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
  });

  const onSubmit: SubmitHandler<TourCreateType> = (data) => {
    const exitValue: TourCreateType = {
      ...data,
      price_person: +data.price_person,
      available_slots: +data.available_slots,
    };

    mutate(exitValue);
  };

  return (
    <form className='grid gap-3 min-w-80' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center font-bold text-3xl'>Create tour</h1>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{errors.root.message}</p>
        </div>
      )}
      <Input placeholder='Tour title' required {...register('title', { required: true })} />
      <div className='flex gap-2 pt-2'>
        <Input
          type='date'
          label='Start date'
          id='start_date'
          className='w-full'
          {...register('start_date', { required: true })}
          min={new Date().toISOString().split('T')[0]}
          required
        />
        <Input
          type='date'
          id='end_date'
          label='End date'
          className='w-full'
          min={watch('start_date') || new Date().toISOString().split('T')[0]}
          {...register('end_date', { required: true })}
          required
        />
      </div>
      <div className='flex gap-2'>
        <Controller
          name='price_person'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              placeholder='Price per person ($)'
              name='price_person'
              className='w-full'
              value={field.value ?? ''}
              required
              onChange={(e) => {
                field.onChange(OnlyNumbers(e.target.value, String(field.value) || ''));
              }}
            />
          )}
        />
        <Controller
          name='available_slots'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              placeholder='Avaliable slots'
              name='available_slots'
              className='w-full'
              value={field.value ?? ''}
              onChange={(e) => {
                field.onChange(OnlyNumbers(e.target.value, String(field.value) || ''));
              }}
              required
            />
          )}
        />
      </div>
      <Input placeholder='Tour type' {...register('tour_type', { required: true })} required />
      <Controller
        name='food_type'
        control={control}
        rules={{ required: 'Coose a food type' }}
        render={({ field }) => (
          <Select
            placeholder='Food type'
            isFull={true}
            options={tourFoodOptions}
            {...field}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name='country_id'
        control={control}
        rules={{ required: 'Choose a country' }}
        render={({ field }) => (
          <Select
            placeholder='Country select'
            options={countries}
            isLoading={loadingCountries}
            isFull={true}
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
            isFull={true}
            onChange={field.onChange}
            error='First choose a country'
            showError={enabled.hotels && !enabled.countries && !watch('country_id')}
            disabled={!watch('country_id')}
          />
        )}
      />
      <Textarea
        placeholder='Description'
        {...register('description', { required: true })}
        required
      />
      <ButtonSubmit text='Create tour' isPending={isPending} />
    </form>
  );
}
