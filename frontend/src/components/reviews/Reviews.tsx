'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { reviewService } from '@/services/reviews.service';
import { Loading } from '../ui/loading/Loading';
import Pagination from '../ui/pagination/Pagination';
import { CreateReview } from './CreateReview';
import { useModal } from '../ui/modal/ModalProvider';
import { useUserStore } from '@/store/userStore';
import { ROLE_ID } from '@/shared/types/user.types';

interface Props {
  tour_id: number;
}

export function Reviews({ tour_id }: Props) {
  const { user } = useUserStore();
  const { open } = useModal();
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 20 });

  const { data, isLoading } = useQuery({
    queryKey: ['reviews', tour_id, pages],
    queryFn: () => reviewService.getReviewsByTour(tour_id, pages),
  });

  return (
    <article className='p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg mb-10 relative'>
      {user && user.role_id === ROLE_ID.USER && (
        <button
          className='p-3 dark:bg-white bg-black text-white dark:text-black rounded-lg absolute right-4'
          onClick={() => open(<CreateReview tour_id={tour_id} />)}
        >
          Create review
        </button>
      )}
      <ul>
        {isLoading ? (
          <div className='flex justify-center'>
            <Loading />
          </div>
        ) : data && data.reviews && data.reviews.length > 0 ? (
          <>
            {data.reviews.map((review) => (
              <li key={review.review_id}></li>
            ))}
            <Pagination pages={pages} setPages={setPages} total={data.total} />
          </>
        ) : (
          <h1 className='text-center text-4xl font-bold'>There is not reviews</h1>
        )}
      </ul>
    </article>
  );
}
