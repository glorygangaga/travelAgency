import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { isEqual } from 'lodash';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/select/Select';
import { hotelService } from '@/services/hotel.service';
import { updateHotelType } from '@/shared/types/hotel.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';

interface Props {
  hotelId: number;
}

export function HotelUpdate({ hotelId }: Props) {
  const queryClient = useQueryClient();
  const { close } = useModal();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<updateHotelType>({ mode: 'onSubmit' });

  const results = useQueries({
    queries: [
      {
        queryKey: ['countries'],
        queryFn: () => hotelService.getCountriesForSelect(),
      },
      {
        queryKey: ['hotels'],
        queryFn: () => hotelService.getHotel(hotelId),
      },
    ],
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['hotel', hotelId],
    mutationFn: (hotel: updateHotelType) => hotelService.updateHotel(hotel),
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
    onSuccess() {
      close();
      queryClient.invalidateQueries({
        queryKey: ['hotels'],
      });
    },
  });

  const onSubmit: SubmitHandler<updateHotelType> = (UpdateData) => {
    const data = results[1].data;
    if (!data || isEqual(data, UpdateData)) return;
    mutate(UpdateData);
  };

  useEffect(() => {
    const data = results[1].data;
    if (!data) return;
    reset({
      hotel_id: data.hotel_id,
      hotel_name: data.hotel_name,
      category: data.category,
      country_id: data.country_id,
      description: data.description,
    });
  }, [results[1].data]);

  return (
    <form className='grid gap-3 min-w-72' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center font-bold text-3xl'>Update hotel</h1>
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
            options={results[0].data}
            isLoading={results[0].isLoading}
            {...field}
            value={field.value}
            isFull={true}
            onChange={field.onChange}
          />
        )}
      />
      <textarea
        id='description'
        placeholder='Country description'
        className='resize-y border border-white/30 rounded-lg min-h-28 p-2 outline-none max-h-[300px]'
        {...register('description', { required: true })}
      />
      <ButtonSubmit text='Update hotel' isPending={isPending} />
    </form>
  );
}
