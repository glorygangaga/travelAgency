'use client';

import { FC, memo, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import PaginationButtons from './PaginationButtons';

interface PaginationProps {
  pages: {
    pageNumber: number;
    pageSize: number;
  };
  setPages: React.Dispatch<
    React.SetStateAction<{
      pageNumber: number;
      pageSize: number;
    }>
  >;
  total: number;
}

const Pagination: FC<PaginationProps> = ({ pages, setPages, total }) => {
  const [buttons, _] = useState<number[]>(
    Array(Math.ceil(total / pages.pageSize))
      .fill(0)
      .map((_, i) => i + 1),
  );
  return (
    buttons.length > 1 && (
      <article className='flex gap-4 mt-4 justify-center w-fit dark:bg-black bg-white border border-black/10 mx-auto p-4 rounded-4xl'>
        <button
          disabled={pages.pageNumber === 1}
          className={`transition-colors ${
            pages.pageNumber === 1 ? 'opacity-40 cursor-not-allowed' : ''
          }`}
          onClick={() =>
            pages.pageNumber !== 1 && setPages({ ...pages, pageNumber: pages.pageNumber - 1 })
          }
        >
          <ArrowLeft />
        </button>
        <div className='flex gap-3 items-end'>
          {buttons.map((el) => (
            <PaginationButtons
              key={el}
              pageTo={el}
              end={Math.ceil(total / pages.pageSize)}
              setPages={setPages}
              pages={pages}
            />
          ))}
        </div>

        <button
          disabled={Math.ceil(total / pages.pageSize) === pages.pageNumber}
          className={`transition-colors ${
            Math.ceil(total / pages.pageSize) === pages.pageNumber
              ? 'opacity-40 cursor-not-allowed'
              : ''
          }`}
          onClick={() =>
            Math.ceil(total / pages.pageSize) > pages.pageNumber &&
            setPages({ ...pages, pageNumber: pages.pageNumber + 1 })
          }
        >
          <ArrowRight />
        </button>
      </article>
    )
  );
};

export default memo(Pagination);
