import type { FC } from 'react';
import type { AsideTypesExtentionsData } from '../../../../shared/types/aside.types';
import { useModal } from '../../../ui/modal/ModalProvider';
import { AsideSpanFramer } from './AsideSpanFramer';
import { useAsideContext } from '@/shared/lib/hook/useAsideContext';

const AsideExtent: FC<AsideTypesExtentionsData> = ({ element, data }) => {
  const { CloseMenu } = useAsideContext();
  const { open } = useModal();

  return (
    <button
      className='transition-colors hover:bg-black/15 dark:hover:bg-white/10 rounded-md py-2 px-4 flex'
      onClick={() => {
        CloseMenu && CloseMenu();
        open(element);
      }}
    >
      <AsideSpanFramer text={data} />
    </button>
  );
};

export default AsideExtent;
