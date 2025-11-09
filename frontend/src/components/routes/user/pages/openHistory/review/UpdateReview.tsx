import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useModal } from '@/components/ui/modal/ModalProvider';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';
import { reviewService } from '@/services/reviews.service';
import { updateReviewType } from '@/shared/types/reviews.types';
import { Textarea } from '@/components/ui/textarea/Textarea';
import { StarsReview } from '@/components/reviews/StarsReview';

interface Props {
  review_id: number;
}

export function UpdateReview({ review_id }: Props) {
  const t = useTranslations('USER.REVIEWS');

  const [stars, setStars] = useState({ now: 0, prev: 0 });

  const queryClient = useQueryClient();
  const { close } = useModal();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<updateReviewType>({ mode: 'onSubmit' });

  const { data } = useQuery({
    queryKey: ['review', review_id],
    queryFn: () => reviewService.getReviewByUser(review_id),
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ['review', review_id],
    mutationFn: (data: updateReviewType) => reviewService.updateReview(data),
    onSuccess() {
      close();
      queryClient.invalidateQueries({
        queryKey: ['review'],
      });
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
  });

  const onSubmit: SubmitHandler<updateReviewType> = (UpdateData) => {
    if (!data || isEqual(data, UpdateData) || !UpdateData.rating) return;
    mutate(UpdateData);
  };

  useEffect(() => {
    if (stars.now > 0) reset((prev) => ({ ...prev, rating: stars.now }));
  }, [stars]);

  useEffect(() => {
    if (!data) return;
    reset({
      review_id: data.review_id,
      comment: data.comment,
    });
    setStars((prev) => ({ ...prev, now: data.rating }));
  }, [data]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid gap-3 min-w-80'>
      <h1 className='text-center font-bold text-3xl'>{t('UPDATE')}</h1>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{errors.root.message}</p>
        </div>
      )}
      <StarsReview stars={stars} setStars={setStars} />
      <Textarea {...register('comment', { required: true })} />
      <ButtonSubmit text={t('UPDATE')} isPending={isPending} />
    </form>
  );
}
