'use client';

import { useQuery } from '@tanstack/react-query';

import { userService } from '@/services/user.service';
import { getReviewsTypeResponse } from '@/shared/types/user.types';
import { ReviewSkeleton } from './ReviewSkeleton';
import { ReviewsItems } from './ReviewsItems';

export default function UserReviewHistory() {
  const { data, isLoading, isError } = useQuery<getReviewsTypeResponse>({
    queryKey: ['review'],
    queryFn: () => userService.getReviews(),
  });

  return (
    <div className='p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg backdrop-blur-sm shadow-[5px_5px_15px_0px_rgba(0,0,0,0.10)]'>
      {isLoading ? (
        <ReviewSkeleton />
      ) : data && data.length > 0 ? (
        <ReviewsItems data={data} />
      ) : isError ? (
        <h1 className='font-bold text-2xl text-center text-red-600'>Something went wrong</h1>
      ) : (
        <h1 className='font-bold text-2xl text-center'>There is not reviews in your account</h1>
      )}
    </div>
  );
}
