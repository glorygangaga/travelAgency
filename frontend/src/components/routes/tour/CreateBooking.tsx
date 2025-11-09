import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';
import { bookingService } from '@/services/booking.service';
import { createBookingType } from '@/shared/types/booking.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { Input } from '@/components/ui/Input';
import { FullTourData } from '@/shared/types/tour.types';
import { OnlyNumbersWithMax } from '@/shared/lib/functions/OnlyNumbers';

interface Props {
  tour: FullTourData;
}

export default function CreateBooking({ tour }: Props) {
  const [sum, setSum] = useState<number>(0);
  const { close } = useModal();
  const { push } = useRouter();

  const {
    setError,
    handleSubmit,
    watch,
    control,
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
    mutate(data);
  };

  useEffect(() => {
    if (!watch('num_people')) reset((prev) => ({ ...prev, num_people: 0 }));
    const value = watch('num_people') * tour.price_person;
    setSum(value);
    reset((prev) => ({ ...prev, total_price: value }));
  }, [watch('num_people')]);

  useEffect(() => {
    if (!watch('tour_id')) reset((prev) => ({ ...prev, tour_id: tour.tour_id }));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3 min-w-80'>
      <h1 className='text-center font-bold text-3xl'>Create booking</h1>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{errors.root.message}</p>
        </div>
      )}
      <div
        className={`flex justify-center transition-opacity ${
          sum === 0 ? 'opacity-0 invisible' : ''
        }`}
      >
        <p>Total price: {sum}$</p>
      </div>

      <Controller
        name='num_people'
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            label='Count of people'
            id='count'
            value={String(field.value)}
            onChange={(e) =>
              field.onChange(OnlyNumbersWithMax(e.target.value, tour.available_slots))
            }
          />
        )}
      />
      <ButtonSubmit text='Create' isPending={isPending} />
    </form>
  );
}
