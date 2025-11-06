import { hotelType } from '@/shared/types/hotel.types';

interface Props {
  hotel_id: string;
}

export async function Hotel({ hotel_id }: Props) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/hotel/${hotel_id}`, {
    next: { revalidate: 600 },
    method: 'GET',
  });

  if (!res.ok) return <h1>Something went wrong</h1>;

  const hotel: hotelType = await res.json();

  return (
    <>
      <div>
        <h1>{hotel.hotel_name}</h1>
        <p>{hotel.description}</p>
        <p>{hotel.category}</p>
      </div>
    </>
  );
}
