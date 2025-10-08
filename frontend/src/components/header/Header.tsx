import { HeaderForm } from './HeaderForm';
import { Burger } from './Burger';
import { HeaderButtons } from './HeaderButtons';

export function Header() {
  return (
    <header className='py-3.5 border-b dark:bg-black/70 backdrop-blur-sm border-black/20 dark:border-white/10 sticky z-[2] top-0 mb-3.5'>
      <div className='flex justify-between px-3 items-center'>
        <div className='hidden max-md:block'>
          <Burger />
        </div>
        <HeaderForm />
        <HeaderButtons />
      </div>
    </header>
  );
}
