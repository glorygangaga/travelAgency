import { useModal } from '@/components/modal/ModalProvider';
import { AsideTypesExtentionsData } from '@/shared/types/aside.types';

interface Props {
  data: AsideTypesExtentionsData;
}

export function AsideExtent({ data }: Props) {
  const { open } = useModal();

  return (
    <button
      className='transition-colors hover:bg-white/10 rounded-md py-2 px-4 flex'
      onClick={() => open(<div>{data.text}</div>)}
    >
      {data.text}
    </button>
  );
}
