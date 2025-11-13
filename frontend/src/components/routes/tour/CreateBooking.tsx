import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';
import { bookingService } from '@/services/booking.service';
import { createBookingType } from '@/shared/types/booking.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { FullTourData } from '@/shared/types/tour.types';

interface Props {
  tour: FullTourData;
}

export default function CreateBooking({ tour }: Props) {
  const [sum, setSum] = useState<number>(0);
  const [cnt, setCnt] = useState<number>(0);
  const { close } = useModal();
  const { push } = useRouter();

  const {
    setError,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<createBookingType>({ mode: 'onSubmit' });

  const { mutate, isPending } = useMutation({
    mutationKey: ['booking', tour.tour_id],
    mutationFn: (data: createBookingType) => bookingService.createBooking(data),
    onSuccess(successData) {
      close();
      push(`/checkout/${successData.data.booking_id}`);
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
  });

  const onSubmit: SubmitHandler<createBookingType> = (data) => {
    if (data.num_people <= 0) return;
    mutate(data);
  };

  useEffect(() => {
    reset((prev) => ({ ...prev, num_people: cnt }));
    const value = parseFloat((watch('num_people') * tour.price_person).toFixed(2));
    setSum(value);
    reset((prev) => ({ ...prev, total_price: value }));
  }, [cnt]);

  useEffect(() => {
    if (!watch('tour_id')) reset((prev) => ({ ...prev, tour_id: tour.tour_id }));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3 min-w-80'>
      <h1 className='text-center font-bold text-3xl'>Create booking</h1>
      <h2 className='text-center'>Count of people</h2>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{errors.root.message}</p>
        </div>
      )}
      <div className='flex gap-5 items-center justify-center text-3xl'>
        <button
          className='border rounded-full h-12 w-12 flex justify-center items-center'
          type='button'
          onClick={() => setCnt((prev) => (prev - 1 >= 0 ? --prev : 0))}
        >
          -
        </button>
        <h1 className='font-bold'>{cnt}</h1>
        <button
          className='border rounded-full h-12 w-12 flex justify-center items-center'
          onClick={() => setCnt((prev) => (prev + 1 > tour.available_slots ? prev : ++prev))}
          type='button'
        >
          +
        </button>
      </div>
      {sum > 0 && (
        <div
          className={`flex justify-center transition-opacity ${
            sum === 0 ? 'opacity-0 invisible' : ''
          }`}
        >
          <p>Total price: {sum}$</p>
        </div>
      )}
      <ButtonSubmit text='Create' isPending={isPending} />
    </form>
  );
}
