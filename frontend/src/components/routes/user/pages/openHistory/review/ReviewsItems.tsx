import { Check, Edit2, Ellipsis, EllipsisVertical, UserCircle, X } from 'lucide-react';

import { StarRaiting } from '@/components/ui/StarRaiting/StarRaiting';
import { ReviewType } from '@/shared/types/reviews.types';
import { ReviewUserCard } from './ReviewUserCard';

interface Props {
  data: (ReviewType & { user: { username: string } })[];
}

export function ReviewsItems({ data }: Props) {
  return (
    <>
      <h1 className='font-bold text-center text-2xl'>Your reviews</h1>
      <ul>
        {data.map((review) => (
          <ReviewUserCard review={review} key={review.review_id} />
        ))}
      </ul>
    </>
  );
}
