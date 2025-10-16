import { ReactNode, useMemo, useState, lazy, Suspense } from 'react';

const UserReviewHistory = lazy(() => import('./review/UserReviewHistory'));
const TripHistory = lazy(() => import('./tripHistory/TripHistory'));

const Infos: { text: string; component: ReactNode }[] = [
  { text: 'Ваши отзывы', component: <UserReviewHistory /> },
  { text: 'История поездок', component: <TripHistory /> },
] as const;

export function ListsUserInfo() {
  const [active, setActive] = useState(Infos[0].text);

  const activeInfo = useMemo(() => Infos.find((el) => el.text === active), [active]);

  return (
    <aside>
      <ul className='flex gap-2 mb-3'>
        {Infos.map((list) => (
          <li key={list.text}>
            <button
              className={`border-b transition-colors ${
                active === list.text
                  ? 'font-bold'
                  : 'dark:text-white/75 dark:hover:text-white/90 text-black/75 hover:text-black/90'
              }`}
              onClick={() => setActive(list.text)}
            >
              {list.text}
            </button>
          </li>
        ))}
      </ul>
      {active && (
        <div className='p-4 bg-black/5 dark:bg-white/10 rounded-2xl backdrop-blur-sm'>
          <Suspense fallback={'loading'}>{activeInfo?.component ?? null}</Suspense>
        </div>
      )}
    </aside>
  );
}
