const lists = Array(9)
  .fill(0)
  .map((_, i) => i + 1);

export function ToursSkeleton() {
  return (
    <div className='grid min-sm:grid-cols-2 min-lg:grid-cols-3 gap-4 relative p-4 bg-white border border-black/20 dark:bg-black rounded-lg'>
      {lists.map((list) => (
        <div
          key={list}
          className='p-2 rounded-lg border border-black/20 dark:border-white/20 transition-transform h-[151px]'
        >
          <div className='flex justify-between gap-2 h-4/6'>
            <div className='w-full grid gap-2'>
              <div className='w-full dark:bg-white/20 bg-black/15 h-7 rounded-xl' />
              <div className='w-full dark:bg-white/20 bg-black/15 h-7 rounded-xl' />
            </div>
            <div className='w-full grid gap-2 justify-items-end'>
              <div className='w-1/2 dark:bg-white/20 bg-black/15 h-7 rounded-xl' />
              <div className='w-1/2 dark:bg-white/20 bg-black/15 h-7 rounded-xl' />
            </div>
          </div>
          <div className='flex gap-40 justify-between mt-1.5 pt-1.5 border-t border-black/20 dark:border-white/20'>
            <div className='w-full dark:bg-white/20 bg-black/15 h-6 rounded-xl' />
            <div className='w-full dark:bg-white/20 bg-black/15 h-6 rounded-xl' />
          </div>
        </div>
      ))}
    </div>
  );
}
