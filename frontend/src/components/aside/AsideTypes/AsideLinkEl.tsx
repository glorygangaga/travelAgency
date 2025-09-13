import { iconMap } from '@/shared/data/aside.data';
import { AsideElementType } from '@/shared/types/aside.types';
import Link from 'next/link';

interface Props {
  lists: AsideElementType;
}

export function AsideLinkEl({ lists }: Props) {
  const Icon = iconMap[lists.icon];

  return (
    <Link
      href={lists.href}
      className='flex items-center justify-center group-hover:gap-2 group-hover:justify-start px-4 rounded-md py-2 transition-colors hover:bg-white/10'
    >
      <Icon className='w-5' />
      <span className='max-w-0 invisible overflow-hidden opacity-0 group-hover:max-w-fit group-hover:visible group-hover:opacity-100 transition-all duration-500 ease-in-out'>
        {lists.text}
      </span>
    </Link>
  );
}
