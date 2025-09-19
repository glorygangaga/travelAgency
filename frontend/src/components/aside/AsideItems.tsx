import type { FC } from 'react';
import { getAsideData } from '../../shared/data/aside.data';
import AsideElement from './AsideElement';
import { useTranslations } from 'next-intl';

type Props = {
  CloseMenu?: () => void;
};

const AsideItems: FC<Props> = ({ CloseMenu }) => {
  const t = useTranslations();

  const ASIDE_MAIN_DATA = getAsideData(t);

  return (
    <ul className='grid gap-1 max-md:text-xl'>
      {ASIDE_MAIN_DATA.map((lists) => (
        <AsideElement key={lists.text} lists={lists} CloseMenu={CloseMenu} />
      ))}
    </ul>
  );
};

export default AsideItems;
