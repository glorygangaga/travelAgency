import { UserReviewHistory } from './review/UserReviewHistory';
import { TripHistory } from './tripHistory/TripHistory';

export default async function ListsUserInfo() {
  return (
    <aside className='grid gap-2'>
      {/* <UserReviewHistory reviews={reviews} />
      <TripHistory bookings={bookings} /> */}
    </aside>
  );
}
