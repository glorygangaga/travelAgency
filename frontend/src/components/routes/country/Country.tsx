import { countryType } from '@/shared/types/country.types';

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
      <h1>{country.country_name}</h1>
      <p>{country.description}</p>
    </>
  );
}
