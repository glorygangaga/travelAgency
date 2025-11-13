import { getTranslations } from 'next-intl/server';

import { SettingsInfo } from '@/components/routes/user/settings/SettingsInfo';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'USER' });
  return {
    title: t('USER_SETTINGS'),
    description: 'User settings page',
  };
}

export default function Page() {
  return <SettingsInfo />;
}
