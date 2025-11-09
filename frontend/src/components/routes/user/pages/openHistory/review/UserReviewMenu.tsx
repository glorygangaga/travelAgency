import { Edit2Icon, EllipsisVertical, LinkIcon, Trash } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useModal } from '@/components/ui/modal/ModalProvider';
import { DeleteReview } from './DeleteReview';
import { ReviewType } from '@/shared/types/reviews.types';
import { UpdateReview } from './UpdateReview';

interface Props {
  review: ReviewType & { user: { username: string } };
}

export function UserReviewMenu({ review }: Props) {
  const t = useTranslations('USER.REVIEWS');

  const { open } = useModal();

  return (
    <div className='group relative'>
      <EllipsisVertical className='cursor-pointer' width={20} height={20} />

      <div className='absolute z-100 opacity-0 invisible group-hover:visible group-hover:opacity-100 border border-black/20 bg-white dark:bg-black p-3 rounded-lg -top-18 right-full w-max transition-opacity grid gap-2'>
        <button
          className='flex justify-between gap-4 hover:bg-black/10 dark:hover:bg-white/20 transition-colors p-2 rounded-lg'
          onClick={() => open(<UpdateReview review_id={review.review_id} />)}
        >
          <span>{t('EDIT')}</span>
          <Edit2Icon />
        </button>
        <Link
          href={`/tour/${review.tour_id}`}
          className='flex justify-between gap-4 hover:bg-black/10 dark:hover:bg-white/20 transition-colors p-2 rounded-lg'
        >
          <span>{t('SEE')}</span>
          <LinkIcon />
        </Link>
        <button
          className='flex justify-between gap-4 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-red-600 p-2 rounded-lg'
          onClick={() => open(<DeleteReview reivew_id={review.review_id} />)}
        >
          <span>{t('DELETE')}</span>
          <Trash />
        </button>
      </div>
    </div>
  );
}
