import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/select/Select';
import { authService } from '@/services/auth.service';
import { createUserByAdminType, ROLE_ID } from '@/shared/types/user.types';
import { useModal } from '@/components/ui/modal/ModalProvider';

const options = [
  { value: 'User', id: 1, exitValue: ROLE_ID.USER },
  { value: 'Manager', id: 2, exitValue: ROLE_ID.MODERATOR },
  { value: 'Admin', id: 3, exitValue: ROLE_ID.ADMIN },
];

export function UsersCreate() {
  const { close } = useModal();

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<createUserByAdminType>({ mode: 'onChange' });

  const { mutate, isPending } = useMutation({
    mutationKey: ['users'],
    mutationFn: (user: createUserByAdminType) => authService.createUserByAdmin(user),
    onSuccess() {
      close();
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
  });

  const onSubmit: SubmitHandler<createUserByAdminType> = (data) => {
    mutate(data);
  };

  return (
    <form className='grid gap-3 min-w-80' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='font-bold text-center text-2xl'>Create user</h1>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg mt-2.5 text-center'>
          <p>{errors.root.message}</p>
        </div>
      )}
      <Input
        placeholder='User email'
        id='email'
        autoComplete='off'
        {...register('email', { required: true })}
      />
      <Input
        type='password'
        placeholder='User password'
        id='password'
        autoComplete='off'
        passwordToggle={true}
        {...register('password', { required: 'true' })}
      />
      <Controller
        name='role_id'
        control={control}
        rules={{ required: 'Выберите роль' }}
        render={({ field }) => (
          <Select
            options={options}
            {...field}
            value={field.value}
            onChange={field.onChange}
            placeholder='Choose role'
            isFull={true}
          />
        )}
      />
      <button
        disabled={isPending}
        className='gap-2 flex justify-center max-sm:w-full bg-white py-2 rounded-lg transition-colors text-black'
      >
        {isPending ? <LoaderCircle className='transition-transform animate-spin' /> : 'Save'}
      </button>
    </form>
  );
}
