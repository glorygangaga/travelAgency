import { PlusCircle } from 'lucide-react';

import { GetUserByAdmin, RoleNames } from '@/shared/types/user.types';
import { UsersCreate } from './UsersCreate';
import { useModal } from '@/components/ui/modal/ModalProvider';

import { Table } from '@/components/ui/table/Table';

interface Props {
  data: GetUserByAdmin[];
}

export function UsersList({ data }: Props) {
  const { open } = useModal();

  return (
    <article className='grid gap-3 '>
      <div className='flex justify-end'>
        <button
          className='flex items-center gap-2 bg-white text-black p-2 rounded-lg'
          onClick={() => open(<UsersCreate />)}
        >
          <span>Create new user</span>
          <PlusCircle />
        </button>
      </div>
      <Table
        names={['Email', 'Fullname', 'Date', 'Phone', 'Created at', 'Updated at', 'Role']}
        tbodyChild={
          <>
            {data.map((user) => (
              <tr key={user.user_id} className='text-center'>
                <td>{user.email}</td>
                {RoleNames[user.role_id] === 'User' ? (
                  <>
                    <td>{user.fullname ?? <span className='text-red-600'>x</span>}</td>
                    <td>
                      {user.date ? (
                        user.date.split('T')[0]
                      ) : (
                        <span className='text-red-600'>x</span>
                      )}
                    </td>
                    <td>{user.phone ?? <span className='text-red-600'>x</span>}</td>
                  </>
                ) : (
                  <>
                    <td></td>
                    <td></td>
                    <td></td>
                  </>
                )}
                <td>{user.created_at}</td>
                <td>{user.updated_at}</td>
                <td>{RoleNames[user.role_id]}</td>
              </tr>
            ))}
          </>
        }
      />
    </article>
  );
}
