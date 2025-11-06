'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

import { reviewService } from '@/services/reviews.service';
import { Loading } from '../ui/loading/Loading';
import Pagination from '../ui/pagination/Pagination';
import { CreateReview } from './CreateReview';
import { useModal } from '../ui/modal/ModalProvider';
import { useUserStore } from '@/store/userStore';
import { ROLE_ID } from '@/shared/types/user.types';
import { ReviewCard } from './ReviewCard';

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
    <article className='p-4 max-w-6xl mx-auto bg-white border border-black/15 dark:bg-black/60 rounded-lg mb-10 relative'>
      <ul className='grid gap-2 mb-2'>
        {isLoading ? (
          <div className='flex justify-center'>
            <Loading />
          </div>
        ) : data && data.reviews && data.reviews.length > 0 ? (
          <>
            {data.reviews.map((review) => (
              <ReviewCard review={review} key={review.review_id} />
            ))}

            <Pagination pages={pages} setPages={setPages} total={data.total} />
          </>
        ) : (
          <h1 className='text-center text-4xl font-bold'>There is not reviews</h1>
        )}
      </ul>
      {user && user.role_id === ROLE_ID.USER && (
        <div className='flex justify-end'>
          <button
            className='py-2 px-4 dark:bg-white bg-black text-white dark:text-black rounded-lg flex gap-2'
            onClick={() => open(<CreateReview tour_id={tour_id} />)}
          >
            <Plus />
            <span>Create review</span>
          </button>
        </div>
      )}
    </article>
  );
}
