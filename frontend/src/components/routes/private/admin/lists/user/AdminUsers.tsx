'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { useModal } from '@/components/ui/modal/ModalProvider';
import Pagination from '@/components/ui/pagination/Pagination';
import { userService } from '@/services/user.service';
import { UsersCreate } from './UsersCreate';
import { UsersList } from './UsersList';
import { TableSkeleton } from '@/components/ui/table/TableSkeleton';

export function AdminUsers() {
  const { open } = useModal();
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 15 });

  const { data, isLoading } = useQuery({
    queryKey: ['users', pages.pageNumber],
    queryFn: () => userService.getAllUsers(pages),
  });

  return (
    <section className='px-4'>
      {isLoading ? (
        <TableSkeleton
          skeleton={{ isLoading, countRows: 5 }}
          names={['Email', 'Fullname', 'Date', 'Phone', 'Created at', 'Updated at', 'Role']}
        />
      ) : data && data.users && data.users.length > 0 ? (
        <>
          <UsersList data={data.users} />
          <Pagination pages={pages} setPages={setPages} total={data.total} />
        </>
      ) : (
        <div className='grid justify-items-center gap-3 font-bold'>
          <h1 className='text-5xl text-center pt-20'>There is no users in data</h1>
          <button
            className='bg-white text-black p-2 rounded-lg text-2xl'
            onClick={() => open(<UsersCreate />)}
          >
            Create user
          </button>
        </div>
      )}
    </section>
  );
}
