import { getReviewsTypeResponse } from '@/shared/types/user.types';

interface Props {
  data: getReviewsTypeResponse;
}

export function ReviewsItems({ data }: Props) {
  return (
    <>
      <h1 className='font-bold text-center text-2xl'>Your reviews</h1>
      <ul>
        {data.map((review) => (
          <li key={review.review_id}>{review.comment}</li>
        ))}
      </ul>
    </>
  );
}
