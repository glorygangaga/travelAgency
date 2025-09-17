import type { FC } from 'react';
import type { AsideTypesExtentionsData } from '../../../../shared/types/aside.types';
import { useModal } from '../../../../components/modal/ModalProvider';

const AsideExtent: FC<AsideTypesExtentionsData & { CloseMenu?: () => void }> = ({
  element,
  data,
  CloseMenu,
}) => {
  const { open } = useModal();

  return (
    <button
      className='transition-colors hover:bg-black/15 dark:hover:bg-white/10 rounded-md py-2 px-4 flex'
      onClick={() => {
        CloseMenu && CloseMenu();
        open(element);
      }}
    >
      {data}
    </button>
  );
};

export default AsideExtent;
