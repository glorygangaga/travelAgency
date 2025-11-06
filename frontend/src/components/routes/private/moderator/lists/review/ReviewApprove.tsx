import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Loading } from '@/components/ui/loading/Loading';
import { reviewService } from '@/services/reviews.service';

interface Props {
  reviewId: number;
}

export function ReviewApprove({ reviewId }: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['reviews', reviewId],
    mutationFn: () => reviewService.approveReview(reviewId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      });
    },
  });

  return (
    <button className='bg-white rounded-lg py-1 px-7 text-black w-[116px]' onClick={() => mutate()}>
      {isPending ? <Loading /> : 'Approve'}
    </button>
  );
}
