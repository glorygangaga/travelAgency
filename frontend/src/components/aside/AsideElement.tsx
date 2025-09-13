import { AsideElementType } from '@/shared/types/aside.types';
import { AsideExtentEl } from './AsideTypes/AsideExtentEl';
import { AsideLinkEl } from './AsideTypes/AsideLinkEl';

interface Props {
  lists: AsideElementType;
}

export function AsideElement({ lists }: Props) {
  return (
    <li key={lists.text} className={lists.isNew ? 'border-t pt-3 mt-2 border-white/20' : ''}>
      {lists.extentions ? <AsideExtentEl lists={lists} /> : <AsideLinkEl lists={lists} />}
    </li>
  );
}
