import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const UserReviewHistory = dynamic(() => import('./review/UserReviewHistory'), {
  loading: () => <div />,
});

const TripHistory = dynamic(() => import('./tripHistory/TripHistory'), {
  loading: () => <div />,
});

export default async function ListsUserInfo() {
  return (
    <aside className='grid gap-2'>
      <Suspense>
        <UserReviewHistory />
      </Suspense>
      <Suspense>
        <TripHistory />
      </Suspense>
    </aside>
  );
}
