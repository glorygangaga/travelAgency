import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';

import { useModal } from '@/components/ui/modal/ModalProvider';
import { TourTypeRes } from '@/shared/types/tour.types';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';
import { tourService } from '@/services/tour.service';

interface Props {
  tour: TourTypeRes;
}

export function TourDelete({ tour }: Props) {
  const queryClient = useQueryClient();
  const { close } = useModal();

  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['tour', tour.tour_id],
    mutationFn: () => tourService.deleteTour(tour.tour_id),
    onSuccess() {
      close();
      queryClient.invalidateQueries({
        queryKey: ['tour'],
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
    <form onSubmit={handleSubmit} className='grid gap-3 w-96'>
      <h1 className='text-2xl font-bold text-center'>You want to delete {tour.title}?</h1>
      {error && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{error}</p>
        </div>
      )}
      <ButtonSubmit isPending={isPending} text='Yes' />
    </form>
  );
}
