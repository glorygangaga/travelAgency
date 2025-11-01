import { TourType } from '@/shared/types/tour.types';

interface Props {
  tour_id: string;
}

export async function Tour({ tour_id }: Props) {
  console.log(process.env.NEXT_PUBLIC_API_URL + `/tour/${tour_id}`);

  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/tour/${tour_id}`, {
    next: { revalidate: 600 },
    method: 'GET',
  });

  if (!res.ok) return <h1>Something went wrong</h1>;

  const tour: TourType = await res.json();

  return (
    <>
      <h1>{tour.title}</h1>
      <p>{tour.description}</p>
      <p>{tour.tour_type}</p>
      <p>{tour.price_person} Rubles</p>
      <p>{tour.available_slots}</p>
      <p>{tour.food_type}</p>
      <div className='flex gap-2'>
        <p>{new Date(tour.start_date).toISOString().split('T')[0]}</p>
        <p>{new Date(tour.end_date).toISOString().split('T')[0]}</p>
      </div>
      <button className='px-10 py-2 rounded-md dark:bg-white bg-black text-white dark:text-black'>
        Buy a tour
      </button>
    </>
  );
}
