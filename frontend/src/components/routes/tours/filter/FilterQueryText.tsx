import { Search } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/Input';
import { useProviderContext } from '@/shared/lib/hook/useProvideContext';
import { FilterContext } from './Filter';

export function FilterQueryText() {
  const t = useTranslations('FILTER');
  const { control } = useProviderContext(FilterContext);

  return (
    <Controller
      name='q'
      control={control}
      render={({ field }) => (
        <Input
          leftIcon={<Search />}
          placeholder={t('FIND_TOUR')}
          className='w-fit'
          {...field}
          value={field.value || ''}
          onChange={(e) => field.onChange(e.target.value)}
          id='query'
        />
      )}
    />
  );
}
