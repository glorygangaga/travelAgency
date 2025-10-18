import type { FC } from 'react';

import type { AsideElementType } from '../../../../shared/types/aside.types';
import { useModal } from '../../../ui/modal/ModalProvider';
import { iconMap } from '../../../../shared/data/aside.data';
import { AsideSpanFramer } from './AsideSpanFramer';

type Props = {
  list: AsideElementType;
};

const AsideElemModal: FC<Props> = ({ list }) => {
  const Icon = iconMap[list.icon];

  const { open } = useModal();

  return (
    <button
      onClick={() => open(list.element)}
      className='flex items-center cursor-pointer justify-center group-hover:gap-2 group-hover:justify-start max-md:gap-2 max-md:justify-start px-4 rounded-md py-2 transition-colors hover:bg-black/15 dark:hover:bg-white/10 w-full'
    >
      <Icon className='w-5' />
      <AsideSpanFramer text={list.text} />
    </button>
  );
};

export default AsideElemModal;
