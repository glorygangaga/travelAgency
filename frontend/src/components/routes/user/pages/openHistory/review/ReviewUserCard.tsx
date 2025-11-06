import { Check, EllipsisVertical, UserCircle, X } from 'lucide-react';

import { StarRaiting } from '@/components/ui/StarRaiting/StarRaiting';
import { ReviewType } from '@/shared/types/reviews.types';

interface Props {
  review: ReviewType & { user: { username: string } };
}

export function ReviewUserCard({ review }: Props) {
  return (
    <li className='border dark:border-white/20 border-black/20 p-2 rounded-lg'>
      <div className='flex justify-between items-center mb-1.5 border-b border-black/20 dark:border-white/20 pb-1.5'>
        <div className='flex gap-2'>
          <UserCircle />
          <h1>{review.user.username}</h1>
        </div>
        <div className='flex gap-4 items-center'>
          <div>
            <p className='flex gap-1 items-center justify-end'>
              <span>Approved</span>
              {review.is_approved ? (
                <Check className='text-green-600 w-5 h-5' />
              ) : (
                <X className='text-red-600 w-5 h-5' />
              )}
            </p>
          </div>
          <StarRaiting rating={review.rating} />
          <button>
            <EllipsisVertical width={20} height={20} />
          </button>
        </div>
      </div>
      <p>{review.comment}</p>
    </li>
  );
}
