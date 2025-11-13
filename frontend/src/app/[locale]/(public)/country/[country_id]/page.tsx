import { getTranslations } from 'next-intl/server';

import { Country } from '@/components/routes/country/Country';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'COUNTRY' });
  return {
    title: t('COUNTRY'),
    description: 'Country',
  };
}

export default async function Page({ params }: { params: { country_id: string } }) {
  const { country_id } = await params;

  return <Country country_id={country_id} />;
}
