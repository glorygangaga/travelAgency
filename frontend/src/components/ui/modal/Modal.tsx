import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ children, isOpen, onClose }: Props) {
  return (
    <div
      className={`fixed left-0 top-0 w-screen h-screen bg-black/15 flex justify-center items-center z-20 backdrop-blur-xs cursor-pointer transition-opacity duration-300 text-black dark:text-white ${
        !isOpen ? 'opacity-0 invisible' : 'opacity-100 visible'
      } `}
      onMouseDown={onClose}
    >
      <div
        className={`w-auto min-md:max-h-3/4 overflow-y-hidden min-md:max-w-10/12 overflow-auto bg-gray-100 dark:bg-black border border-black/20 dark:border-white/20 p-8 z-40 cursor-default relative min-w-xs transition-transform ${
          isOpen ? 'scale-100' : 'scale-75'
        } max-md:absolute max-md:w-full max-md:h-full max-md:max-h-screen max-md:flex max-md:flex-col left-0 top-0 min-md:rounded-2xl`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className='absolute right-1.5 top-1.5 cursor-pointer p-1 transition-colors hover:bg-white/10 rounded-sm'
          onClick={onClose}
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
