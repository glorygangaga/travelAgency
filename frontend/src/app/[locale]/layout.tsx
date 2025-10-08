import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { getMessages, getTranslations } from 'next-intl/server';
import { hasLocale, NextIntlClientProvider } from 'next-intl';

import { Providers } from './Providers';

import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: {
      default: t('SITE_NAME'),
      template: `%s - ${t('SITE_NAME')}`,
    },
    description: t('SITE_NAME'),
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>{children}</Providers>
    </NextIntlClientProvider>
  );
}
