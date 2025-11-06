'use client';

import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  value: {
    country_id: number;
    query: string;
  };
  onChange: Dispatch<
    SetStateAction<{
      country_id: number;
      query: string;
    }>
  >;
}

export function FinderForm({ value, onChange }: Props) {
  const t = useTranslations();

  return (
    <form className='border-b border-black/20 dark:border-white/20'>
      <input
        className='focus:outline-0 p-3 text-2xl w-full'
        placeholder={`${t('FINDER_LIST.Search')} ${t('SITE_NAME')}`}
        name='finder'
        id='finder'
        autoFocus={true}
        value={value.query}
        onChange={(e) => onChange((prev) => ({ ...prev, query: e.target.value }))}
      />
    </form>
  );
}
