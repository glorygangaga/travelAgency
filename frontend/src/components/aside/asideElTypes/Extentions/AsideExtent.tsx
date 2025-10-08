import type { FC } from 'react';
import type { AsideTypesExtentionsData } from '../../../../shared/types/aside.types';
import { useModal } from '../../../../components/modal/ModalProvider';
import { useAsideContext } from '@/hook/useAsideContext';
import { AsideSpanFramer } from './AsideSpanFramer';

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
