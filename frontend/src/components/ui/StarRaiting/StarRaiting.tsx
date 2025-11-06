import { Star } from 'lucide-react';

interface Props {
  rating: number;
}

export function StarRaiting({ rating }: Props) {
  return (
    <div className='flex items-center gap-1'>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          width={16}
          className={index < rating ? 'fill-yellow-300 text-yellow-300' : 'fill-none text-gray-300'}
        />
      ))}
      <span className='text-xs'>({rating}/5)</span>
    </div>
  );
}
