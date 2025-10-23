import { PlusCircle } from 'lucide-react';

import { GetUserByAdmin, RoleNames } from '@/shared/types/user.types';
import { UsersCreate } from './UsersCreate';
import { useModal } from '@/components/ui/modal/ModalProvider';

interface Props {
  data: GetUserByAdmin[];
}

export function UsersList({ data }: Props) {
  const { open } = useModal();

  return (
    <article className='grid gap-3'>
      <div className='flex justify-end'>
        <button
          className='flex items-center gap-2 bg-white text-black p-2 rounded-lg'
          onClick={() => open(<UsersCreate />)}
        >
          <span>Create new user</span>
          <PlusCircle />
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Fullname</th>
            <th>Date</th>
            <th>phone</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.user_id} className='text-center'>
              <td>{user.email}</td>
              <td>{user.fullname ?? <span className='text-red-600'>x</span>}</td>
              <td>
                {user.date ? (
                  new Date(user.date).toISOString()
                ) : (
                  <span className='text-red-600'>x</span>
                )}
              </td>
              <td>{user.phone ?? <span className='text-red-600'>x</span>}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
              <td>{RoleNames[user.role_id]}</td>
              <td>
                <button className='bg-white text-black p-2 rounded-lg'>button</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
