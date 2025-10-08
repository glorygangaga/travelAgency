'use client';

import { useTranslations } from 'next-intl';

export function LanguageTitle() {
  const t = useTranslations();

  return <h1 className='font-bold text-3xl'>{t('ASIDE.Language')}</h1>;
}
