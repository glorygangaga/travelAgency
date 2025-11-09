import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { reviewService } from '@/services/reviews.service';
import { createReviewType } from '@/shared/types/reviews.types';
import { ButtonSubmit } from '../ui/button/ButtonSubmit';
import { Textarea } from '../ui/textarea/Textarea';
import { StarsReview } from './StarsReview';

interface Props {
  tour_id: number;
}

export function CreateReview({ tour_id }: Props) {
  const t = useTranslations('REVIEW');

  const [stars, setStars] = useState({ now: 0, prev: 0 });
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ['reivews', tour_id],
    mutationFn: (data: createReviewType) => reviewService.createReview(data),
    onSuccess() {
      setIsSuccess(true);
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
  } = useForm<createReviewType>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<createReviewType> = (data) => {
    mutate(data);
  };

  useEffect(() => {
    if (tour_id) reset((prev) => ({ ...prev, tour_id }));
    if (stars.now > 0) reset((prev) => ({ ...prev, rating: stars.now }));
  }, [stars, tour_id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3 min-w-80'>
      <h1 className='text-center font-bold text-3xl mb-2'>{t('CREATE')}</h1>
      {isSuccess ? (
        <div className='bg-black/10 dark:bg-white/10 mb-2 text-green-600 p-2 rounded-lg mt-2.5 text-center'>
          <p className='max-w-[300px]'>{t('WAIT')}</p>
        </div>
      ) : (
        errors.root && (
          <div className='bg-black/10 dark:bg-white/10 mb-2 text-red-500 p-2 rounded-lg mt-2.5 text-center'>
            <p>{errors.root.message}</p>
          </div>
        )
      )}
      <StarsReview stars={stars} setStars={setStars} />
      <Textarea className='w-full h-min resize-none' {...register('comment', { required: true })} />
      <ButtonSubmit isPending={isPending} text={t('CREATE')} />
    </form>
  );
}
