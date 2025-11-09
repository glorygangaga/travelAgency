import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Table } from '@/components/ui/table/Table';
import { ReviewType } from '@/shared/types/reviews.types';

const ReviewApprove = dynamic(() => import('./ReviewApprove'));

interface Props {
  data: ReviewType[];
}

export default function ReviewsList({ data }: Props) {
  return (
    <article className='grid gap-3 max-w-5xl mx-auto'>
      <Table
        names={['Comment', 'raiting', 'tour_id', '']}
        tbodyChild={data.map((review) => (
          <tr key={review.review_id}>
            <td>{review.comment}</td>
            <td>{review.rating}</td>
            <td className='relative'>
              <Link
                href={`/tour/${review.tour_id}`}
                className='w-full h-full absolute left-0 top-0 flex justify-center items-center'
              >
                {review.tour_id}
              </Link>
            </td>
            <td>
              <ReviewApprove reviewId={review.review_id} />
            </td>
          </tr>
        ))}
      />
    </article>
  );
}
