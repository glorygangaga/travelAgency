import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';

import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { reviewService } from '@/services/reviews.service';

interface Props {
  reivew_id: number;
}

export function DeleteReview({ reivew_id }: Props) {
  const t = useTranslations('USER.REVIEWS');

  const queryClient = useQueryClient();
  const { close } = useModal();

  const [error, setError] = useState('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['review', reivew_id],
    mutationFn: () => reviewService.deleteReview(reivew_id),
    onSuccess() {
      close();
      queryClient.invalidateQueries({
        queryKey: ['review'],
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
    <form className='grid gap-3 w-96' onSubmit={handleSubmit}>
      <h1 className='text-2xl font-bold text-center'>{t('WANT')}</h1>
      {error && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{error}</p>
        </div>
      )}
      <ButtonSubmit isPending={isPending} text={t('YES')} />
    </form>
  );
}
