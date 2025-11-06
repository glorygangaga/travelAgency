'use client';

import { TableSkeleton } from '@/components/ui/table/TableSkeleton';
import { reviewService } from '@/services/reviews.service';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ReviewsList } from './ReviewsList';
import Pagination from '@/components/ui/pagination/Pagination';

export function Reviews() {
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 20 });

  const { isLoading, data } = useQuery({
    queryKey: ['reviews', pages],
    queryFn: () => reviewService.getReviewsNotApproved(pages),
  });

  return (
    <section>
      {isLoading ? (
        <TableSkeleton
          skeleton={{ isLoading, countRows: 5 }}
          names={['Comment', 'raiting', 'tour_id', '']}
        />
      ) : data && data.reviews && data.reviews.length > 0 ? (
        <>
          <ReviewsList data={data.reviews} />
          <Pagination pages={pages} setPages={setPages} total={data.total} />
        </>
      ) : (
        <h1 className='text-5xl text-center pt-20 font-bold'>
          There is no data with not approved reviews.
        </h1>
      )}
    </section>
  );
}
