import { PlusCircle } from 'lucide-react';

import { getCountryTypeResponse } from '@/shared/types/country.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { CountryMenu } from './CountryMenu';
import { CountryCreate } from './CountryCreate';

interface Props {
  data: getCountryTypeResponse;
}

export function CountryList({ data }: Props) {
  const { open } = useModal();

  return (
    <article className='grid gap-3'>
      <div className='flex justify-end'>
        <button
          className='flex items-center gap-2 bg-white text-black p-2 rounded-lg'
          onClick={() => open(<CountryCreate />)}
        >
          <span>Create new country</span>
          <PlusCircle />
        </button>
      </div>
      <ul className='grid grid-cols-2 gap-3 min-sm:grid-cols-3'>
        {data.countries.map((country) => (
          <li key={country.country_id} className='bg-black border border-white/10 p-3 rounded-md '>
            <div className='relative'>
              <CountryMenu country={country} />
              <h1 className='mr-7 bg-white/10 rounded-md p-2 mb-2'>{country.country_name}</h1>
              <p className='line-clamp-3'>{country.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
