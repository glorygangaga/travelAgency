export function RegisterSkeleton() {
  return (
    <div className='w-[512px] h-[304px] flex flex-col gap-2 p-4 max-lg:w-auto'>
      <div className='rounded-lg flex justify-center'>
        <div className='h-10 w-24 rounded-lg dark:bg-white/20 bg-black/15' />
      </div>
      <div className='grid gap-2'>
        <div className='w-full dark:bg-white/20 bg-black/15 h-10 rounded-xl' />
        <div className='w-full dark:bg-white/20 bg-black/15 h-10 rounded-xl' />
        <div className='w-full dark:bg-white/20 bg-black/15 h-10 rounded-xl' />

        <div className='flex justify-center'>
          <div className='w-1/3 dark:bg-white/20 bg-black/15 h-10 rounded-xl' />
        </div>
      </div>
      <div className='h-5 w-1/6 dark:bg-white/20 bg-black/15 rounded-lg' />
    </div>
  );
}
