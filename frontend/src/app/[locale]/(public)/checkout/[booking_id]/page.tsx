import { getTranslations } from 'next-intl/server';

import { NO_INDEX_PAGE } from '@/shared/data/routing';
import type { Metadata } from 'next';
import { Checkout } from '@/components/routes/checkout/Checkout';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CHECKOUT' });
  return {
    title: t('TITLE'),
    ...NO_INDEX_PAGE,
  };
}

export default async function Page({ params }: { params: { booking_id: string } }) {
  const { booking_id } = await params;

  return <Checkout booking_id={booking_id} />;
}
