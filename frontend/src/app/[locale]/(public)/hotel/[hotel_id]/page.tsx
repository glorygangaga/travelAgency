import { getTranslations } from 'next-intl/server';

import { Hotel } from '@/components/routes/hotel/Hotel';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HOTEL' });
  return {
    title: t('HOTEL'),
    description: 'Hotel',
  };
}

export default async function Page({ params }: { params: { hotel_id: string } }) {
  const { hotel_id } = await params;

  return (
    <section>
      <Hotel hotel_id={hotel_id} />
    </section>
  );
}
