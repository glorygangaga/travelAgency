import { countryType } from '@/shared/types/country.types';
import { ToursByCountry } from './ToursByCountry';
import { CarouselImage } from '@/components/ui/carousel/CarouselImage';

interface Props {
  country_id: string;
}

export async function Country({ country_id }: Props) {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/country/${country_id}`, {
    next: { revalidate: 600 },
    method: 'GET',
  });

  if (!res.ok) {
    return <h1 className='text-center text-5xl font-bold pt-10'>Country not found</h1>;
  }

  let country: countryType;

  try {
    country = await res.json();
  } catch {
    return <h1 className='text-center text-5xl font-bold pt-10'>Country not found</h1>;
  }

  return (
    <>
      <article className='max-w-5xl flex mx-auto gap-3 items-center justify-center mb-5 p-4 bg-white border border-black/15 dark:bg-black rounded-lg flex-col'>
        <h1 className='text-5xl font-bold'>{country.country_name}</h1>
        <p>{country.description}</p>

        {country.images && country.images.length > 0 && (
          <CarouselImage delay={7000} images={country.images} allowTouch={true} />
        )}
      </article>
      <ToursByCountry country_id={country.country_id} />
    </>
  );
}
