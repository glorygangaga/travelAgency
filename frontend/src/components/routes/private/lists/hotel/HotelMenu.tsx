import { Edit2Icon, EllipsisVertical, Trash } from 'lucide-react';
import dynamic from 'next/dynamic';

import { hotelWithCountry } from '@/shared/types/hotel.types';
import { useModal } from '@/components/ui/modal/ModalProvider';

const HotelUpdate = dynamic(() => import('./HotelUpdate'));
const HotelDelete = dynamic(() => import('./HotelDelete'));

interface Props {
  hotel: hotelWithCountry;
}

export default function HotelMenu({ hotel }: Props) {
  const { open } = useModal();

  return (
    <div className='absolute right-1/5 top-1/2 -translate-y-1/2 group'>
      <EllipsisVertical className='cursor-pointer relative' />
      <div className='absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 bg-black p-3 rounded-lg -top-10 right-full w-max transition-opacity grid gap-2'>
        <button
          className='flex justify-between gap-4 hover:bg-white/20 transition-colors p-2 rounded-lg'
          onClick={() => open(<HotelUpdate hotelId={hotel.hotel_id} />)}
        >
          <span>Edit hotel</span>
          <Edit2Icon />
        </button>
        <button
          className='flex justify-between gap-4 hover:bg-white/20 transition-colors text-red-600 p-2 rounded-lg'
          onClick={() => open(<HotelDelete hotel={hotel} />)}
        >
          <span>Delete hotel</span>
          <Trash />
        </button>
      </div>
    </div>
  );
}
