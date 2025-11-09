'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { ReviewSkeleton } from './ReviewSkeleton';
import { ReviewsItems } from './ReviewsItems';
import { reviewService } from '@/services/reviews.service';
import Pagination from '@/components/ui/pagination/Pagination';

export default function UserReviewHistory() {
  const t = useTranslations('USER.REVIEWS');
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 10 });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['review'],
    queryFn: () => reviewService.getReviewsByUser(pages),
  });

  return (
    <div className='p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg backdrop-blur-sm shadow-[5px_5px_15px_0px_rgba(0,0,0,0.10)]'>
      {isLoading ? (
        <ReviewSkeleton />
      ) : data && data.reviews && data.reviews.length > 0 ? (
        <>
          <ReviewsItems data={data.reviews} />
          <Pagination total={data.total} pages={pages} setPages={setPages} />
        </>
      ) : isError ? (
        <h1 className='font-bold text-2xl text-center text-red-600'>Something went wrong</h1>
      ) : (
        <h1 className='font-bold text-2xl text-center'>{t('NOT')}</h1>
      )}
    </div>
  );
}
