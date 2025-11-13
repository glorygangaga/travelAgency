import { getTranslations } from 'next-intl/server';

import { Tour } from '@/components/routes/tour/Tour';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TOUR' });
  return {
    title: t('TOUR'),
    description: 'Tour',
  };
}

export default async function Page({ params }: { params: { tour_id: string } }) {
  const { tour_id } = await params;

  return (
    <section>
      <Tour tour_id={tour_id} />
    </section>
  );
}
