'use client';

import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { useModal } from '@/components/ui/modal/ModalProvider';
import Pagination from '@/components/ui/pagination/Pagination';
import { userService } from '@/services/user.service';
import { UsersCreate } from './UsersCreate';
import { UsersList } from './UsersList';

export function AdminUsers() {
  const { open } = useModal();
  const [pages, setPages] = useState({ pageNumber: 1, pageSize: 15 });

  const { data, isLoading } = useQuery({
    queryKey: ['countries', pages.pageNumber],
    queryFn: () => userService.getAllUsers(pages),
  });

  return (
    <section className='px-4'>
      {isLoading ? (
        <div className='flex gap-3 text-4xl font-bold items-center justify-center pt-20'>
          <h1>Loading</h1>
          <LoaderCircle
            strokeWidth={4}
            className='transition-transform animate-spin duration-1000'
          />
        </div>
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
