import { getReviewsTypeResponse } from '@/shared/types/user.types';

interface Props {
  reviews: getReviewsTypeResponse;
}

export function UserReviewHistory({ reviews }: Props) {
  return (
    <div className='p-4 bg-black/5 dark:bg-black/60 rounded-lg backdrop-blur-sm'>
      {reviews.length > 0 ? (
        <>
          <h1>Your reviews</h1>
          <ul>
            {reviews.map((review) => (
              <li key={review.review_id}>{review.comment}</li>
            ))}
          </ul>
        </>
      ) : (
        <h1 className='font-bold text-2xl text-center'>There is not reviews in your account</h1>
      )}
    </div>
  );
}
