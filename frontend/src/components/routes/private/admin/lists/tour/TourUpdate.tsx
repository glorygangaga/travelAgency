import { isEqual } from 'lodash';
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useModal } from '@/components/ui/modal/ModalProvider';
import { tourService } from '@/services/tour.service';
import { hotelService } from '@/services/hotel.service';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';
import { TourType } from '@/shared/types/tour.types';
import { Select } from '@/components/ui/select/Select';
import { tourFoodOptions } from '@/store/tourOptions';
import { Input } from '@/components/ui/Input';
import { OnlyNumbers } from '@/shared/lib/functions/OnlyNumbers';
import { Textarea } from '@/components/ui/textarea/Textarea';

interface Props {
  tourId: number;
}

export function TourUpdate({ tourId }: Props) {
  const queryClient = useQueryClient();
  const { close } = useModal();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<TourType>({ mode: 'onSubmit' });

  const queries = useQueries({
    queries: [
      {
        queryKey: ['hotels'],
        queryFn: () => tourService.getHotelsForSelect(),
      },
      {
        queryKey: ['countries'],
        queryFn: () => hotelService.getCountriesForSelect(),
      },
      {
        queryKey: ['tour', tourId],
        queryFn: () => tourService.getTour(tourId),
      },
    ],
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['tour', tourId],
    mutationFn: (data: TourType) => tourService.updateTour(data),
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

  const onSubmit: SubmitHandler<TourType> = (UpdateData) => {
    const data = queries[1].data;
    if (!data || isEqual(data, UpdateData)) return;
    mutate(UpdateData);
  };

  useEffect(() => {
    if (!queries[2].data) return;
    const data = queries[2].data;

    reset({
      ...data,
      start_date: new Date(data.start_date).toISOString().split('T')[0],
      end_date: new Date(data.end_date).toISOString().split('T')[0],
    });
  }, [queries[2].data]);

  return (
    <form className='grid gap-3 min-w-80' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center font-bold text-3xl'>Update tour</h1>
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
              placeholder='Price per person (Rubles)'
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
            options={queries[1].data}
            isLoading={queries[1].isLoading}
            isFull={true}
            {...field}
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
            options={queries[0].data}
            isLoading={queries[0].isLoading}
            {...field}
            value={field.value}
            isFull={true}
            onChange={field.onChange}
          />
        )}
      />
      <Textarea
        placeholder='Description'
        {...register('description', { required: true })}
        required
      />
      <ButtonSubmit text='Update tour' isPending={isPending} />
    </form>
  );
}
