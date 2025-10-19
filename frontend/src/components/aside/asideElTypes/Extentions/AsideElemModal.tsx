import type { FC } from 'react';
import Link from 'next/link';

import { useUserStore } from '@/store/userStore';
import { iconMap } from '@/shared/data/aside.data';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { AsideSpanFramer } from './AsideSpanFramer';
import { AsideElementType } from '@/shared/types/aside.types';

type Props = {
  list: AsideElementType;
};

const AsideElemModal: FC<Props> = ({ list }) => {
  const { user } = useUserStore();
  const Icon = iconMap[list.icon];

  const { open } = useModal();

  return user && list.text === 'Account' ? (
    <Link
      className='flex items-center cursor-pointer justify-center gap-2 max-md:gap-2 max-md:justify-start group-hover:justify-start px-4 rounded-md py-2 transition-colors hover:bg-black/15 dark:hover:bg-white/10'
      href='/account'
    >
      <Icon className='w-5' />
      <AsideSpanFramer text={list.text} />
    </Link>
  ) : (
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
