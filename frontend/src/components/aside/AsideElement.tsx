import type { FC } from 'react';
import type { AsideElementType } from '../../shared/types/aside.types';
import AsideExtentEl from './asideElTypes/AsideExtentEl';
import AsideLinkEl from './asideElTypes/AsideLinkEl';

interface Props {
  lists: AsideElementType;
  CloseMenu?: () => void;
}

const AsideElement: FC<Props> = ({ lists, CloseMenu }) => {
  return (
    <li
      key={lists.text}
      className={lists.isNew ? 'border-t pt-3 mt-2 border-black/20 dark:border-white/20' : ''}
    >
      {lists.extentions ? (
        <AsideExtentEl lists={lists} CloseMenu={CloseMenu} />
      ) : (
        <AsideLinkEl lists={lists} CloseMenu={CloseMenu} />
      )}
    </li>
  );
};

export default AsideElement;
