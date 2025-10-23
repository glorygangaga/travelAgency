import { Edit2Icon, EllipsisVertical, Trash } from 'lucide-react';

import { CountryUpdate } from './CountryUpdate';
import { CountryDelete } from './CountryDelete';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { countryType } from '@/shared/types/country.types';

interface Props {
  country: countryType;
}

export function CountryMenu({ country }: Props) {
  const { open } = useModal();

  return (
    <div className='absolute right-0 top-2 group'>
      <EllipsisVertical className='cursor-pointer' />

      <div className='absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 bg-black p-3 rounded-lg -right-5/6 top-full w-max transition-opacity grid gap-2'>
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
