'use client';
import { ROLE_ID } from '@/shared/types/user.types';
import { useUserStore } from '@/store/userStore';
import { Heart } from 'lucide-react';

interface Props {
  tour_id: number;
}

export function FavoriteButton({ tour_id }: Props) {
  const { handleFavorite, favorites, user } = useUserStore();

  if (!user || user.role_id === ROLE_ID.ADMIN || user.role_id === ROLE_ID.MODERATOR) return null;

  return (
    <button
      onClick={() => handleFavorite(tour_id)}
      className='flex justify-center items-center p-1.5 min-w-12 rounded-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 group transition-none border border-black/15 dark:border-white/15 dark:bg-white/5'
    >
      <Heart
        className={`transition-colors ${
          favorites.some((fav) => fav === tour_id) ? 'fill-red-600 text-red-600' : ''
        }`}
      />
    </button>
  );
}
