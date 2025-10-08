import { useTranslations } from 'next-intl';
import { getAsideData } from '../../shared/data/aside.data';
import AsideElement from './AsideElement';

const AsideItems = () => {
  const t = useTranslations();
  const ASIDE_MAIN_DATA = getAsideData(t);

  return (
    <ul className='grid gap-1 max-md:text-xl'>
      {ASIDE_MAIN_DATA.map((lists) => (
        <AsideElement key={lists.text} lists={lists} />
      ))}
    </ul>
  );
};

export default AsideItems;
