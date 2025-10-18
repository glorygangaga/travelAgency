import Link from 'next/link';
import type { FC } from 'react';

import type { AsideElementType } from '../../../shared/types/aside.types';
import { iconMap } from '../../../shared/data/aside.data';
import AsideElemModal from './Extentions/AsideElemModal';
import { AsideSpanFramer } from './Extentions/AsideSpanFramer';
import { useAsideContext } from '@/shared/lib/hook/useAsideContext';

interface Props {
  lists: AsideElementType;
}

const AsideLinkEl: FC<Props> = ({ lists }) => {
  const { CloseMenu } = useAsideContext();
  const Icon = iconMap[lists.icon];

  return (
    <div onClick={() => CloseMenu && CloseMenu()}>
      {lists.element ? (
        <AsideElemModal list={lists} />
      ) : (
        lists.href && (
          <>
            <Link
              className='flex items-center cursor-pointer justify-center gap-2 max-md:gap-2 max-md:justify-start group-hover:justify-start px-4 rounded-md py-2 transition-colors hover:bg-black/15 dark:hover:bg-white/10'
              href={lists.href}
            >
              <Icon className='w-5' />
              <AsideSpanFramer text={lists.text} />
            </Link>
          </>
        )
      )}
    </div>
  );
};

export default AsideLinkEl;
