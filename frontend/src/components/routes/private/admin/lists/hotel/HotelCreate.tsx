import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { createHotelType } from '@/shared/types/hotel.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { hotelService } from '@/services/hotel.service';

export function HotelCreate() {
  const { close } = useModal();
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<createHotelType>({ mode: 'onSubmit' });

  const { mutate, isPending } = useMutation({
    mutationKey: ['hotels'],
    mutationFn: (hotel: createHotelType) => hotelService.createHotel(hotel),
    onSuccess() {
      close();
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
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
      <textarea
        id='description'
        placeholder='Country description'
        className='resize-y border border-white/30 rounded-lg min-h-28 p-2 outline-none max-h-[300px]'
        {...register('description', { required: true })}
      />
      <button type='submit' className='bg-white text-black p-2 rounded-lg'>
        {isPending ? (
          <LoaderCircle className='transition-transform animate-spin duration-1000' />
        ) : (
          'Create hotel'
        )}
      </button>
    </form>
  );
}
