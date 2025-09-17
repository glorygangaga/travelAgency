import type { FC } from 'react';
import { ASIDE_MAIN_DATA } from '../../shared/data/aside.data';
import AsideElement from './AsideElement';

type Props = {
  CloseMenu?: () => void;
};

const AsideItems: FC<Props> = ({ CloseMenu }) => {
  return (
    <ul className='grid gap-1 max-md:text-xl'>
      {ASIDE_MAIN_DATA.map((lists) => (
        <AsideElement key={lists.text} lists={lists} CloseMenu={CloseMenu} />
      ))}
    </ul>
  );
};

export default AsideItems;
