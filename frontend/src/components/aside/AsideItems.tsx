import { ASIDE_MAIN_DATA } from '@/shared/data/aside.data';
import { AsideElement } from './AsideElement';

export function AsideItems() {
  return (
    <ul className='grid gap-1'>
      {ASIDE_MAIN_DATA.map((lists) => (
        <AsideElement key={lists.text} lists={lists} />
      ))}
    </ul>
  );
}
