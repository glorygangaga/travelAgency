import { Star } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  stars: {
    now: number;
    prev: number;
  };
  setStars: Dispatch<
    SetStateAction<{
      now: number;
      prev: number;
    }>
  >;
}

const starsList: number[] = [1, 2, 3, 4, 5];

export function StarsReview({ stars, setStars }: Props) {
  return (
    <ul className='flex gap-2 justify-center'>
      {starsList.map((star) => (
        <li
          key={star}
          onClick={() => setStars((prev) => ({ ...prev, now: star }))}
          onMouseEnter={() => setStars((prev) => ({ ...prev, prev: star }))}
          onMouseLeave={() => setStars((prev) => ({ ...prev, prev: 0 }))}
          className={`transition-colors ${star <= stars.now ? 'text-yellow-300' : ''} ${
            stars.prev >= star ? 'text-yellow-300' : ''
          }`}
        >
          <Star className={`${star <= stars.now ? 'fill-yellow-300' : ''}`} />
        </li>
      ))}
    </ul>
  );
}
