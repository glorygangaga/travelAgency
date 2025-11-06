import { countryType } from '@/shared/types/country.types';
import { ToursByCountry } from './ToursByCountry';

interface Props {
  country_id: string;
}

export async function Country({ country_id }: Props) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/country/${country_id}`, {
    next: { revalidate: 600 },
    method: 'GET',
  });

  if (!res.ok) return <h1>Something went wrong</h1>;

  const country: countryType = await res.json();

  return (
    <>
      <article className='max-w-5xl flex mx-auto gap-3 items-center justify-center mb-5 p-4 bg-white border border-black/15 dark:bg-black rounded-lg flex-col'>
        <h1 className='text-5xl font-bold'>{country.country_name}</h1>
        <p>{country.description}</p>
      </article>
      <ToursByCountry country_id={country.country_id} />
    </>
  );
}
