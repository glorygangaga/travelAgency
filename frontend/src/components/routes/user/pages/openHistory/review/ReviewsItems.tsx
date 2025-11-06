import { Check, Edit2, Ellipsis, EllipsisVertical, UserCircle, X } from 'lucide-react';

import { StarRaiting } from '@/components/ui/StarRaiting/StarRaiting';
import { ReviewType } from '@/shared/types/reviews.types';

interface Props {
  data: (ReviewType & { user: { username: string } })[];
}

export function ReviewsItems({ data }: Props) {
  return (
    <>
      <h1 className='font-bold text-center text-2xl'>Your reviews</h1>
      <ul>
        {data.map((review) => (
          <li
            key={review.review_id}
            className='border dark:border-white/20 border-black/20 p-2 rounded-lg'
          >
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
        ))}
      </ul>
    </>
  );
}
