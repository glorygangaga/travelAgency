'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, LoaderCircle } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { useUserStore } from '@/store/userStore';
import { useActionState, useEffect, useState } from 'react';
import { UpdateUserAction } from '@/actions/updateUserAction';
import { OnlyNumbers } from '@/functions/OnlyNumbers';
import { formatPhoneNumber } from '@/functions/formatPhoneNumber';
import { formatPassportNumber } from '@/functions/formatPassportNumber';

export function SettingsInfo() {
  const { back } = useRouter();
  const { user } = useUserStore();

  const [values, setValues] = useState({
    maxDate: '',
    phone: user?.phone ? user.phone : '',
    passport: user?.passport_number ? user.passport_number : '',
    date: user?.date ? user.date.toISOString() : '',
  });
  const [state, action, isPending] = useActionState(UpdateUserAction, {});

  useEffect(() => {
    setValues((prev) => ({ ...prev, maxDate: new Date().toISOString().split('T')[0] }));
  }, []);

  return (
    <form
      action={action}
      className='grid gap-7 max-w-2xl mt-10 mx-auto p-7 border border-black/15 dark:border-white/15 rounded-lg bg-white/5'
    >
      <div className='relative'>
        <button
          className='absolute -top-1 flex justify-center items-center p-1.5 rounded-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10 group transition-none border border-black/15 dark:border-white/15 dark:bg-white/5'
          onClick={() => back()}
          type='button'
        >
          <ArrowLeft className='w-5 h-5' />
        </button>
        <h1 className='font-bold text-center text-2xl'>Change User data</h1>
      </div>
      <Input
        placeholder='Add username'
        label='Username'
        id='usernameval'
        name='usernameval'
        defaultValue={user?.name}
      />
      <div className='flex gap-3 w-full'>
        <Input
          placeholder='Add firstname'
          className='w-full'
          label='Firstname'
          id='firstname'
          name='firstname'
          defaultValue={user?.fullname?.split(' ')[0]}
        />
        <Input
          placeholder='Add lastname'
          label='Lastname'
          className='w-full'
          id='lastname'
          name='lastname'
          defaultValue={user?.fullname?.split(' ')[0]}
        />
      </div>
      <Input
        placeholder='Add passport number'
        label='Passport number'
        id='passportNumber'
        name='passportNumber'
        value={values.passport}
        onChange={(e) =>
          setValues((prev) => ({
            ...prev,
            passport: formatPassportNumber(e.target.value, prev.passport),
          }))
        }
      />
      <Input
        placeholder='Add phone'
        label='Phone'
        id='phoneval'
        name='phoneval'
        value={values.phone}
        onChange={(e) =>
          setValues((prev) => ({
            ...prev,
            phone: formatPhoneNumber(e.target.value, prev.phone),
          }))
        }
      />
      <Input
        type='date'
        id='date'
        name='date'
        label='Birth date'
        max={values.maxDate}
        defaultValue={values.date}
      />
      <button className='dark:bg-white/20 gap-2 flex justify-center max-sm:w-full bg-black/10 py-2 rounded-lg transition-colors hover:bg-black/15 dark:hover:bg-white/15'>
        {isPending ? (
          <>
            <LoaderCircle className='transition-transform animate-spin' /> <span>Loading</span>
          </>
        ) : (
          <>Save</>
        )}
      </button>
    </form>
  );
}
