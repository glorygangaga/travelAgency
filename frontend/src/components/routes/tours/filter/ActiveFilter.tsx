import { UseFormReset } from 'react-hook-form';
import { X } from 'lucide-react';

import { TourFilterType } from '@/shared/types/tour.types';

interface Props {
  filters: TourFilterType;
  reset: UseFormReset<TourFilterType>;
}

export function ActiveFilter({ filters, reset }: Props) {
  return (
    <ul className='flex flex-wrap gap-2 mb-5'>
      {!!filters &&
        Object.entries(filters).map(([key, value]) => {
          if (value === undefined || value === '' || value === false) return null;
          return (
            <li key={key} className='p-1 rounded-lg bg-white/10 border flex items-center'>
              <p>
                <span>
                  {key}: {value.toString()}
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
  );
}
