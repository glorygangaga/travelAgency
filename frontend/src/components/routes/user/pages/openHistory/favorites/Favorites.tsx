import { FavoriteList } from './FavoriteList';

export function Favorites() {
  return (
    <aside className='p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg backdrop-blur-sm shadow-[5px_5px_15px_0px_rgba(0,0,0,0.10)]'>
      <h1 className='font-bold text-center text-2xl'>Favorite tours</h1>
      <FavoriteList />
    </aside>
  );
}
