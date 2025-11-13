import { getTranslations } from 'next-intl/server';

import { UserInfo } from '@/components/routes/user/pages/UserInfo';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'USER' });
  return {
    title: t('USER_ACCOUNT'),
    description: 'Account page',
  };
}

export default function Page() {
  return <UserInfo />;
}
