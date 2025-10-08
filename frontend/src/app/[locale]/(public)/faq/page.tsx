import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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

export default function Page() {
  return <div>FAQ</div>;
}
