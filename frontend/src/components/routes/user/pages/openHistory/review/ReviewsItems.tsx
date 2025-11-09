import { useTranslations } from 'next-intl';

import { ReviewType } from '@/shared/types/reviews.types';
import { ReviewUserCard } from './ReviewUserCard';

interface Props {
  data: (ReviewType & { user: { username: string } })[];
}

export function ReviewsItems({ data }: Props) {
  const t = useTranslations('USER.REVIEWS');

  return (
    <>
      <h1 className='font-bold text-center text-2xl'>{t('YOUR')}</h1>
      <ul>
        {data.map((review) => (
          <ReviewUserCard review={review} key={review.review_id} />
        ))}
      </ul>
    </>
  );
}
