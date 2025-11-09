import { getTranslations } from 'next-intl/server';

import { Faq } from '@/components/routes/faq/Faq';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ASIDE' });
  return {
    title: t('Faq'),
  };
}

interface PageProps {
  params: { locale: string };
}

export default function Page({ params }: PageProps) {
  return <Faq params={params} />;
}
