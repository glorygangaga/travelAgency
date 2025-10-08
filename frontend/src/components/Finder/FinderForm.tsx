'use client';

import { useTranslations } from 'next-intl';

export function FinderForm() {
  const t = useTranslations();

  return (
    <form className='border-b border-black/20 dark:border-white/20'>
      <input
        className='focus:outline-0 p-3 text-2xl'
        placeholder={`${t('FINDER_LIST.Search')} ${t('SITE_NAME')}`}
        name='finder'
        id='finder'
        autoFocus={true}
      />
    </form>
  );
}
