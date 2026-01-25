import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { Input } from '@/components/ui/Input';
import { createHotelType } from '@/shared/types/hotel.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { hotelService } from '@/services/hotel.service';
import { Select } from '@/components/ui/select/Select';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';
import { AddImageAll } from '@/components/ui/image/AddImageAll';

export default function HotelCreate() {
  const [countriesEnabled, setCountriesEnabled] = useState(false);
  const queryClient = useQueryClient();

  const { close } = useModal();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<createHotelType>({ mode: 'onSubmit' });

  const { mutate, isPending } = useMutation({
    mutationKey: ['hotels'],
    mutationFn: (hotel: FormData) => hotelService.createHotel(hotel),
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
    const formData = new FormData();
    formData.append('category', data.category);
    formData.append('country_id', data.country_id);
    formData.append('description', data.description);
    formData.append('hotel_name', data.hotel_name);

    if (data.files && data.files.length > 0) {
      Array.from(data.files).forEach((file) => {
        formData.append('images', file);
      });
    }

    mutate(formData);
  };

  return (
    <form className='grid gap-3 min-w-72' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center font-bold text-3xl'>Create hotel</h1>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{errors.root.message}</p>
        </div>
      )}
      <AddImageAll
        multiple={true}
        onChange={(files) => {
          setValue('files', files);
        }}
      />
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
        placeholder='Hotel description'
        className='resize-y border border-white/30 rounded-lg min-h-28 p-2 outline-none max-h-[300px]'
        {...register('description', { required: true })}
      />
      <ButtonSubmit text='Create hotel' isPending={isPending} />
    </form>
  );
}
