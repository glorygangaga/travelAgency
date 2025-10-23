import { SetStateAction } from 'react';

interface Props {
  value: string;
  onChange: (value: SetStateAction<string>) => void;
  setIsOpen: (value: SetStateAction<boolean>) => void;
}

export function SelectList({ value, onChange, setIsOpen }: Props) {
  return (
    <li>
      <button
        className='w-full text-start p-2 transition-colors hover:bg-white/10 rounded-lg'
        type='button'
        onClick={() => {
          onChange(value);
          setIsOpen(false);
        }}
      >
        {value}
      </button>
    </li>
  );
}
