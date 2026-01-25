import { getTranslations } from 'next-intl/server';

import { GalleryTour } from './GalleryTour';
import { GalleryHotel } from './GalleryHotel';
import { GalleryCountry } from './GalleryCountry';

export async function Gallery() {
  const t = await getTranslations('ASIDE');
  return (
    <>
      <h1 className='text-5xl mb-5 text-center font-bold'>{t('Gallary')}</h1>
      <section className='grid gap-3 min-md:max-w-[calc(100svw-150px)]'>
        <GalleryCountry />
        <GalleryHotel />
        <GalleryTour />
      </section>
    </>
  );
}
