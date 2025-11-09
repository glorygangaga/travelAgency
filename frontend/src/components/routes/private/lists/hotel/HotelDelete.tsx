import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

import { hotelService } from '@/services/hotel.service';
import { hotelWithCountry } from '@/shared/types/hotel.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';

interface Props {
  hotel: hotelWithCountry;
}

export default function HotelDelete({ hotel }: Props) {
  const queryClient = useQueryClient();
  const { close } = useModal();

  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['hotels', hotel.hotel_id],
    mutationFn: () => hotelService.deleteHotel(hotel.hotel_id),
    onSuccess() {
      close();
      queryClient.invalidateQueries({
        queryKey: ['hotels'],
      });
    },
    onError(error: any) {
      setError(error?.response?.data?.message);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='grid gap-3 w-96'>
      <h1 className='text-2xl font-bold text-center'>You want to delete {hotel.hotel_name}?</h1>
      {error && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{error}</p>
        </div>
      )}

      <ButtonSubmit isPending={isPending} text='Yes' />
    </form>
  );
}
