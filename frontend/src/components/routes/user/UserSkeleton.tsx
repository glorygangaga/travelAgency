export function UserSkeleton() {
  return (
    <section>
      <div className='flex justify-between max-w-6xl mx-auto p-4 h-[128px] bg-black/5 dark:bg-black/60 rounded-2xl'>
        <div className='flex gap-3'>
          <div className='w-[100px] dark:bg-white/20 bg-black/15 h-7 rounded-xl' />
          <div className='h-7 w-[1px] bg-black/20 dark:bg-white/20' />
          <div className='w-7 dark:bg-white/20 bg-black/15 h-7 rounded-xl' />
          <div className='w-7 dark:bg-white/20 bg-black/15 h-7 rounded-xl' />
        </div>
        <div className='w-10 dark:bg-white/20 bg-black/15 h-10 rounded-xl' />
      </div>
    </section>
  );
}
