import { PlusCircle } from 'lucide-react';

import { useModal } from '@/components/ui/modal/ModalProvider';
import { hotelWithCountry } from '@/shared/types/hotel.types';
import { HotelCreate } from './HotelCreate';
import { Table } from '@/components/ui/table/Table';
import { HotelMenu } from './HotelMenu';

interface Props {
  data: hotelWithCountry[];
}

export function HotelList({ data }: Props) {
  const { open } = useModal();
  return (
    <article className='grid gap-3'>
      <div className='flex justify-end'>
        <button
          className='flex items-center gap-2 bg-white text-black p-2 rounded-lg'
          onClick={() => open(<HotelCreate />)}
        >
          Create new hotel
          <PlusCircle />
        </button>
      </div>
      <Table
        tbodyChild={
          <>
            {data.map((hotel) => (
              <tr key={hotel.hotel_id}>
                <td>{hotel.hotel_name}</td>
                <td>{hotel.category}</td>
                <td>
                  <p className='line-clamp-3'>{hotel.description}</p>
                </td>
                <td>{hotel.country.country_name}</td>
                <td className='relative'>
                  <HotelMenu hotel={hotel} />
                </td>
              </tr>
            ))}
          </>
        }
        names={['Hotel', 'Category', 'Description', 'Country', '']}
      />
    </article>
  );
}
