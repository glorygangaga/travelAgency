import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { createHotelType } from '@/shared/types/hotel.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { hotelService } from '@/services/hotel.service';
import { Select } from '@/components/ui/select/Select';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';

export function HotelCreate() {
  const [countriesEnabled, setCountriesEnabled] = useState(false);
  const queryClient = useQueryClient();

  const { close } = useModal();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<createHotelType>({ mode: 'onSubmit' });

  const { mutate, isPending } = useMutation({
    mutationKey: ['hotels'],
    mutationFn: (hotel: createHotelType) => hotelService.createHotel(hotel),
    onSuccess() {
      close();
      queryClient.invalidateQueries({
        queryKey: ['hotels'],
      });
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: () => hotelService.getCountriesForSelect(),
    enabled: countriesEnabled,
  });

  const onSubmit: SubmitHandler<createHotelType> = (data) => {
    mutate(data);
  };

  return (
    <form className='grid gap-3 min-w-72' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center font-bold text-3xl'>Create hotel</h1>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{errors.root.message}</p>
        </div>
      )}
      <Input placeholder='Hotel name' {...register('hotel_name', { required: true })} />
      <Input placeholder='Hotel category' {...register('category', { required: true })} />
      <Controller
        control={control}
        rules={{ required: 'Choose a country' }}
        name='country_id'
        render={({ field }) => (
          <Select
            placeholder='Country position'
            options={data}
            isLoading={isLoading}
            {...field}
            value={field.value}
            isFull={true}
            onChange={field.onChange}
            onClick={() => setCountriesEnabled(true)}
          />
        )}
      />
      <textarea
        id='description'
        placeholder='Country description'
        className='resize-y border border-white/30 rounded-lg min-h-28 p-2 outline-none max-h-[300px]'
        {...register('description', { required: true })}
      />
      <ButtonSubmit text='Create hotel' isPending={isPending} />
    </form>
  );
}
