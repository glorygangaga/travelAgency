import { PlusCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

import { getCountryTypeResponse } from '@/shared/types/country.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { Table } from '@/components/ui/table/Table';

const CountryCreate = dynamic(() => import('./CountryCreate'));
const CountryMenu = dynamic(() => import('./CountryMenu'));

interface Props {
  data: getCountryTypeResponse;
}

export default function CountryList({ data }: Props) {
  const { open } = useModal();

  return (
    <article className='grid gap-3 max-w-5xl mx-auto'>
      <div className='flex justify-end'>
        <button
          className='flex items-center gap-2 bg-white text-black p-2 rounded-lg'
          onClick={() => open(<CountryCreate />)}
        >
          <span>Create new country</span>
          <PlusCircle />
        </button>
      </div>
      <Table
        names={['Name', 'discription', '']}
        tbodyChild={data.countries.map((country) => (
          <tr key={country.country_id}>
            <td>{country.country_name}</td>
            <td>
              <p className='line-clamp-3'>{country.description}</p>
            </td>
            <td className='relative'>
              <CountryMenu country={country} />
            </td>
          </tr>
        ))}
      />
    </article>
  );
}
