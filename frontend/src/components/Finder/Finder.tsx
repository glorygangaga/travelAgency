import { useState } from 'react';
import { FinderForm } from './FinderForm';

const values = ['America', 'Europe', 'Asia', 'Oceania', 'Africa'] as const;

export function Finder() {
  const [part, setPart] = useState<string>('');

  return (
    <div className='grid gap-2'>
      <FinderForm />
      <div className='overflow-x-auto pb-4'>
        <ul className='flex gap-2'>
          {values.map((value) => (
            <li key={value}>
              <button
                className={`p-2 min-w-12 rounded-lg border border-black/20 dark:border-white/20 transition-colors hover:bg-black/10 dark:hover:bg-white/20 ${
                  part === value ? 'bg-black/10 dark:bg-white/20' : ''
                }`}
                onClick={() => setPart((prev) => (value === prev ? '' : value))}
              >
                {value}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div></div>
    </div>
  );
}
