import { options } from '@/shared/types/user.types';
import { SetStateAction } from 'react';

interface Props {
  option: options;
  onChange: (value: SetStateAction<string>) => void;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

export function SelectList({ option, onChange, setIsOpen }: Props) {
  return (
    <li>
      <button
        className='w-full text-start p-2 transition-colors hover:bg-black/10 dark:hover:bg-white/10 rounded-lg'
        type='button'
        onClick={() => {
          onChange(option.exitValue);
          setIsOpen(false);
        }}
      >
        {option.value}
      </button>
    </li>
  );
}
