import { PlusCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

import { TourTypeRes } from '@/shared/types/tour.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { Table } from '@/components/ui/table/Table';

const TourCreate = dynamic(() => import('./TourCreate'));
const TourMenu = dynamic(() => import('./TourMenu'));

interface Props {
  data: TourTypeRes[];
}

export default function TourList({ data }: Props) {
  const { open } = useModal();
  return (
    <article className='grid gap-3'>
      <div className='flex justify-end'>
        <button
          className='flex items-center gap-2 bg-white text-black p-2 rounded-lg'
          onClick={() => open(<TourCreate />)}
        >
          Create new tour
          <PlusCircle />
        </button>
      </div>
      <Table
        tbodyChild={
          <>
            {data.map((tour) => (
              <tr key={tour.tour_id}>
                <td>{tour.title}</td>
                <td>
                  <p className='line-clamp-3'>{tour.description}</p>
                </td>
                <td>{tour.hotel.hotel_name}</td>
                <td>{tour.country.country_name}</td>
                <td>{tour.start_date.split('T')[0]}</td>
                <td>{tour.end_date.split('T')[0]}</td>
                <td>{tour.tour_type}</td>
                <td>{tour.food_type}</td>
                <td>{tour.price_person}</td>
                <td>{tour.available_slots}</td>
                <td className='relative'>
                  <TourMenu tour={tour} />
                </td>
              </tr>
            ))}
          </>
        }
        names={[
          'Title',
          'Description',
          'Hotel name',
          'Country name',
          'Start date',
          'End date',
          'Tour type',
          'Food type',
          'Price person',
          'Available slots',
          '',
        ]}
      />
    </article>
  );
}
