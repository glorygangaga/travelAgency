import { UserCircle } from 'lucide-react';

import { ReviewType } from '@/shared/types/reviews.types';
import { StarRaiting } from '../ui/StarRaiting/StarRaiting';

interface Props {
  review: ReviewType & { user: { username: string } };
}

export function ReviewCard({ review }: Props) {
  return (
    <li className='border dark:border-white/20 border-black/20 p-2 rounded-lg'>
      <div className='flex justify-between items-center mb-1.5 border-b border-black/20 dark:border-white/20 pb-1.5'>
        <div className='flex gap-2'>
          <UserCircle />
          <h1>{review.user.username}</h1>
        </div>
        <div className='flex gap-4 items-center'>
          <StarRaiting rating={review.rating} />
        </div>
      </div>
      <p>{review.comment}</p>
    </li>
  );
}
