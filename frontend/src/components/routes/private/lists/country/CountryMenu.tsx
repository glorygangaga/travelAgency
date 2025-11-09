import { Edit2Icon, EllipsisVertical, Trash } from 'lucide-react';
import dynamic from 'next/dynamic';

import { useModal } from '@/components/ui/modal/ModalProvider';
import { countryType } from '@/shared/types/country.types';

const CountryUpdate = dynamic(() => import('./CountryUpdate'));
const CountryDelete = dynamic(() => import('./CountryDelete'));

interface Props {
  country: countryType;
}

export default function CountryMenu({ country }: Props) {
  const { open } = useModal();

  return (
    <div className='absolute right-1/5 top-1/2 -translate-y-1/2 group'>
      <EllipsisVertical className='cursor-pointer' />

      <div className='absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 bg-black p-3 rounded-lg -top-10 right-full w-max transition-opacity grid gap-2'>
        <button
          className='flex justify-between gap-4 hover:bg-white/20 transition-colors p-2 rounded-lg'
          onClick={() => open(<CountryUpdate countryId={country.country_id} />)}
        >
          <span>Edit country</span>
          <Edit2Icon />
        </button>
        <button
          className='flex justify-between gap-4 hover:bg-white/20 transition-colors text-red-600 p-2 rounded-lg'
          onClick={() => open(<CountryDelete country={country} />)}
        >
          <span>Delete country</span>
          <Trash />
        </button>
      </div>
    </div>
  );
}
