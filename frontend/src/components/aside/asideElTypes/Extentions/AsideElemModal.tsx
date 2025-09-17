import type { FC } from 'react';
import type { AsideElementType } from '../../../../shared/types/aside.types';
import { useModal } from '../../../../components/modal/ModalProvider';
import { iconMap } from '../../../../shared/data/aside.data';

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
      <span className='max-w-0 invisible hidden overflow-hidden opacity-0 max-md:block max-md:max-w-fit max-md:visible max-md:opacity-100 group-hover:block group-hover:max-w-fit group-hover:visible group-hover:opacity-100 transition-all duration-500 ease-in-out'>
        {list.text}
      </span>
    </button>
  );
};

export default AsideElemModal;
