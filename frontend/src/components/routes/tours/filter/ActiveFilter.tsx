import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { RenameFilterActive } from '@/shared/data/RenameFilterActive';
import { useProviderContext } from '@/shared/lib/hook/useProvideContext';
import { FilterContext } from './Filter';

export function ActiveFilter() {
  const t = useTranslations('FILTER.ACTIVE');

  const { filters, reset } = useProviderContext(FilterContext);

  return (
    Object.entries(filters).length > 0 && (
      <ul className='flex flex-wrap gap-2 mb-5'>
        {Object.entries(filters).map(([key, value]) => {
          if (value === undefined || value === '' || value === false) return null;
          const keyText = RenameFilterActive(key, t);
          return (
            <li key={key} className='p-1 rounded-lg bg-white/10 border flex items-center'>
              <p>
                <span>
                  {keyText}: {value.toString()}
                </span>
              </p>
              <button
                onClick={() => {
                  reset((prev) => ({ ...prev, [key]: undefined }));
                }}
              >
                <X />
              </button>
            </li>
          );
        })}
      </ul>
    )
  );
}
