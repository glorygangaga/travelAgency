import { Edit2Icon, EllipsisVertical, Trash } from 'lucide-react';
import { TourTypeRes } from '@/shared/types/tour.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { TourUpdate } from './TourUpdate';
import { TourDelete } from './TourDelete';

interface Props {
  tour: TourTypeRes;
}

export function TourMenu({ tour }: Props) {
  const { open } = useModal();

  return (
    <div className='absolute right-1/5 top-1/2 -translate-y-1/2 group'>
      <EllipsisVertical className='cursor-pointer relative' />
      <div className='absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 bg-black p-3 rounded-lg -top-10 right-full w-max transition-opacity grid gap-2'>
        <button
          className='flex justify-between gap-4 hover:bg-white/20 transition-colors p-2 rounded-lg'
          onClick={() => open(<TourUpdate tourId={tour.tour_id} />)}
        >
          <span>Edit tour</span>
          <Edit2Icon />
        </button>
        <button
          className='flex justify-between gap-4 hover:bg-white/20 transition-colors text-red-600 p-2 rounded-lg'
          onClick={() => open(<TourDelete tour={tour} />)}
        >
          <span>Delete tour</span>
          <Trash />
        </button>
      </div>
    </div>
  );
}
