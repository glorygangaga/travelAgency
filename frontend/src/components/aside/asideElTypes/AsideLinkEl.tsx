import Link from 'next/link';
import type { FC } from 'react';

import type { AsideElementType } from '../../../shared/types/aside.types';
import { iconMap } from '../../../shared/data/aside.data';
import AsideElemModal from './Extentions/AsideElemModal';
import { textVariants } from '../Aside';
import { useAsideContext } from '@/hook/useAsideContext';
import { AsideSpanFramer } from './Extentions/AsideSpanFramer';

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
              {/* <span className='max-w-0 invisible hidden overflow-hidden opacity-0 max-md:block max-md:max-w-fit max-md:visible max-md:opacity-100 group-hover:block group-hover:max-w-fit group-hover:visible group-hover:opacity-100 transition-all duration-500 ease-in-out'></span> */}
            </Link>
          </>
        )
      )}
    </div>
  );
};

export default AsideLinkEl;
