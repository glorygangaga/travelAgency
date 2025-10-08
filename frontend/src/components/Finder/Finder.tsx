import { FinderForm } from './FinderForm';

const values = ['All', 'All1', 'All2', 'All3', 'All4', 'All5', 'All6', 'All7', 'All8'] as const;

export function Finder() {
  return (
    <div className='grid gap-2'>
      <FinderForm />
      <div className='overflow-x-auto pb-4'>
        <ul className='flex gap-2'>
          {values.map((value) => (
            <li key={value}>
              <button className='p-2 min-w-12 rounded-lg border border-black/20 dark:border-white/20 transition-colors hover:bg-black/10 dark:hover:bg-white/20'>
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
