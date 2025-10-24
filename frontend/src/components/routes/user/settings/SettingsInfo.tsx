'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { Controller, Resolver, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Input } from '@/components/ui/Input';
import { useUserStore } from '@/store/userStore';
import { createUserUpdateSchema } from '@/shared/schemas/user.schema';
import { User, UserTypeResponse, UserTypeUpdateRequest } from '@/shared/types/user.types';
import { userService } from '@/services/user.service';
import { formatPassportNumber } from '@/shared/lib/functions/formatPassportNumber';
import { formatPhoneNumber } from '@/shared/lib/functions/formatPhoneNumber';
import { GetNumbersFromString } from '@/shared/lib/functions/OnlyNumbers';

export function SettingsInfo() {
  const { back } = useRouter();
  const { user, setUserData } = useUserStore();
  const schema = createUserUpdateSchema();

  const {
    setError,
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserTypeUpdateRequest>({
    mode: 'onSubmit',
    resolver: zodResolver(schema) as Resolver<UserTypeUpdateRequest>,
  });

  const { isPending, mutate } = useMutation<User, any, UserTypeUpdateRequest>({
    mutationKey: ['update'],
    mutationFn: (data: UserTypeUpdateRequest) => userService.update(data),
    onSuccess(data: User) {
      setUserData(data);
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
  });

  const OnSubmit: SubmitHandler<UserTypeUpdateRequest> = (data) => {
    if (!Object.values(data).some((v) => v !== undefined && v !== '')) {
      setError('root', { message: 'At least one field must be provided' });
      return;
    } else if ((!data.firstname && data.lastname) || (data.firstname && !data.lastname)) {
      if (!data.firstname)
        setError('firstname', {
          message: "Firstname or lastname can't be empty if one of them filled",
        });
      else
        setError('lastname', {
          message: "Firstname or lastname can't be empty if one of them filled",
        });
      return;
    }

    const fullname = data.firstname + ' ' + data.lastname;

    const newData = {
      fullname: fullname.trim() ? fullname : undefined,
      passport_number: GetNumbersFromString(data.passport_number),
      phone: GetNumbersFromString(data.phone),
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : undefined,
    };

    mutate(newData);
  };

  useEffect(() => {
    if (!user) return;
    reset({
      firstname: user.fullname?.split(' ')[0] || '',
      lastname: user.fullname?.split(' ')[1] || '',
      date: user.date ? new Date(user.date).toISOString().split('T')[0] : undefined,
      passport_number: user.passport_number ? formatPassportNumber(user.passport_number, '') : '',
      phone: user.phone ? formatPhoneNumber(user.phone, '') : '',
    });
  }, [user]);

  return (
    <form
      onSubmit={handleSubmit(OnSubmit)}
      className='grid gap-7 max-w-2xl mt-10 mx-auto p-7 rounded-md border border-black/15 bg-white dark:bg-black/60 shadow-[5px_5px_15px_0px_rgba(0,0,0,0.10)]'
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
        {errors.root && (
          <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg mt-2.5 text-center'>
            <p>{errors.root.message}</p>
          </div>
        )}
      </div>
      <div className='flex gap-3 w-full'>
        <Input
          placeholder='Add firstname'
          className='w-full'
          label='Firstname'
          id='firstname'
          error={errors.firstname?.message}
          {...register('firstname')}
        />
        <Input
          placeholder='Add lastname'
          label='Lastname'
          className='w-full'
          id='lastname'
          error={errors.lastname?.message}
          {...register('lastname')}
        />
      </div>
      <Controller
        name='passport_number'
        control={control}
        render={({ field }) => (
          <Input
            placeholder='00 00 0000'
            label='Passport number'
            id='passportNumber'
            {...field}
            error={errors.passport_number?.message}
            value={field.value || ''}
            onChange={(e) => {
              const formatted = formatPassportNumber(e.target.value, field.value || '');
              field.onChange(formatted);
            }}
          />
        )}
      />
      <Controller
        name='phone'
        control={control}
        render={({ field }) => (
          <Input
            placeholder='+7 123 456 78 90'
            label='Phone'
            id='phoneval'
            autoComplete='off'
            error={errors.phone?.message}
            {...field}
            value={field.value || ''}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value, field.value || '');
              field.onChange(formatted);
            }}
          />
        )}
      />
      <Input
        type='date'
        id='date'
        label='Birth date'
        max={new Date().toISOString().split('T')[0]}
        {...register('date')}
        error={errors.date?.message}
      />
      <button
        disabled={isSubmitting || isPending}
        className='dark:bg-white/20 gap-2 flex justify-center max-sm:w-full bg-black/10 py-2 rounded-lg transition-colors hover:bg-black/15 dark:hover:bg-white/15'
      >
        {isPending ? <LoaderCircle className='transition-transform animate-spin' /> : 'Save'}
      </button>
    </form>
  );
}
