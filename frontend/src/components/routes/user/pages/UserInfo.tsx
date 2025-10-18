import { UserInfoHeader } from '../header/UserInfoHeader';
import ListsUserInfo from './openHistory/ListsUserInfo';

export function UserInfo() {
  return (
    <section className='grid gap-3 max-w-6xl mx-auto'>
      <UserInfoHeader />
      <ListsUserInfo />
    </section>
  );
}
