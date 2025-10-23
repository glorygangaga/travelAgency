import { FC, memo } from 'react';

interface PaginationButtonsProps {
  pageTo: number;
  setPages: React.Dispatch<
    React.SetStateAction<{
      pageNumber: number;
      pageSize: number;
    }>
  >;
  pages: {
    pageNumber: number;
    pageSize: number;
  };
  end: number;
}

const PaginationButtons: FC<PaginationButtonsProps> = ({ pageTo, pages, setPages, end }) => {
  return (
    <>
      {pageTo === end && end - pages.pageNumber > 3 && <p className=''>. . .</p>}
      {(Math.abs(pages.pageNumber - pageTo) < 3 || pageTo === end || pageTo === 1) && (
        <button
          className={`px-3 py-1 rounded-full transition-colors hover:bg-white/30 ${
            pages.pageNumber === pageTo ? 'bg-white/20' : ''
          }`}
          onClick={() =>
            pages.pageNumber !== pageTo &&
            setPages({ pageNumber: pageTo, pageSize: pages.pageSize })
          }
        >
          {pageTo}
        </button>
      )}
      {pageTo === 1 && pages.pageNumber > 3 && <p className='flex'>. . .</p>}
    </>
  );
};

export default memo(PaginationButtons);
