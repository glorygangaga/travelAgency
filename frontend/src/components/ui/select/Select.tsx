'use client';

import { Dispatch, SetStateAction, useState, useEffect, useRef, useMemo } from 'react';
import { LoaderCircle, X } from 'lucide-react';

import { Input } from '../Input';
import { SelectList } from './SelectList';
import { options } from '@/shared/types/user.types';

type Props = {
  options: options[] | undefined;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  isFull?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
};

export function Select({
  options,
  value = '',
  onChange,
  placeholder,
  isFull,
  isLoading,
  onClick,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [find, setFind] = useState<string>('');

  const sortedData = useMemo(() => {
    return options?.filter((post) => post.value.toLowerCase().includes(find.toLowerCase()));
  }, [find, options]);

  return (
    <div ref={ref}>
      <button
        className='w-full border border-white/40 p-2 rounded-xl text-start'
        type='button'
        onClick={() => {
          setIsOpen((prev) => !prev);
          onClick && onClick();
        }}
      >
        {options?.find((option) => option.exitValue === value)?.value || placeholder}
      </button>
      <div
        className={`absolute z-50 overflow-y-auto bg-black text-white left-0 transition-all p-3 border border-white/20 w-full rounded-lg ${
          isOpen ? '' : 'opacity-0 invisible'
        } ${isFull ? 'h-full top-0' : 'top-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex gap-1 items-center mb-2'>
          <Input
            id='find'
            placeholder='find options'
            className='w-full'
            value={find}
            onChange={(e) => setFind(e.target.value)}
          />
          <button type='button' onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>
        <ul className='grid gap-1'>
          {isLoading ? (
            <LoaderCircle className='absolute left-1/2 top-1/2 -translate-1/2 transition-transform animate-spin duration-1000' />
          ) : sortedData ? (
            sortedData.map((option) => (
              <SelectList
                key={option.id}
                option={option}
                onChange={onChange}
                setIsOpen={setIsOpen}
              />
            ))
          ) : (
            options?.map((option) => (
              <SelectList
                key={option.id}
                option={option}
                onChange={onChange}
                setIsOpen={setIsOpen}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
