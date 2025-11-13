'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Input } from '@/components/ui/Input';
import { useUserStore } from '@/store/userStore';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { createRegisterSchema } from '@/shared/schemas/auth.schema';
import { authService } from '@/services/auth.service';
import { AuthRegisterTypeRequest } from '@/shared/types/auth.types';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';
import { User } from '@/shared/types/user.types';

export function RegisterForm() {
  const t = useTranslations();
  const schema = createRegisterSchema(t);

  const { push } = useRouter();
  const { close } = useModal();
  const { setUserData } = useUserStore();

  const {
    setError,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthRegisterTypeRequest>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: ({ email, password }: AuthRegisterTypeRequest) =>
      authService.main('register', { email, password }),
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
    async onSuccess(data) {
      const newData: User = {
        username: data.user.username,
        user_id: data.user.user_id,
        email: data.user.email,
        role_id: data.user.role_id,
        date: data.user.date,
        fullname: data.user.fullname,
        passport_number: data.user.passport_number,
        phone: data.user.phone,
        token: data.accessToken,
      };

      setUserData(newData);
      reset();
      close();
      push('/account');
    },
  });

  const onSubmit: SubmitHandler<AuthRegisterTypeRequest> = (data) => {
    mutate(data);
  };

  return (
    <form
      className='grid gap-5 justify-items-center mb-2 w-lg max-lg:w-full'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className='text-3xl font-bold'>{t('Auth.Register')}</h1>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10'>
          <p>{errors.root.message}</p>
        </div>
      )}

      <Input
        label={t('Auth.Email')}
        type='text'
        id='login'
        placeholder='example@mail.ru'
        className='w-full'
        autoComplete='off'
        error={errors.email?.message}
        {...register('email', { required: 'email is required' })}
        required
        autoFocus
      />
      <Input
        type='password'
        id='password'
        autoComplete='off'
        label={t('Auth.Password')}
        passwordToggle={true}
        className='w-full'
        error={errors.password?.message}
        {...register('password', { required: 'password is required' })}
        required
      />
      <Input
        type='password'
        id='passwordVerify'
        autoComplete='off'
        label={t('Auth.ConfPassword')}
        passwordToggle={true}
        className='w-full'
        error={errors.confPassword?.message}
        {...register('confPassword', { required: 'confirm password is required' })}
        required
      />
      <ButtonSubmit
        isPending={isSubmitting || isPending}
        text={t('Auth.Register')}
        className='dark:bg-white dark:text-black flex gap-2 w-1/2 justify-center max-sm:w-full bg-black/80 text-white px-25 py-2 rounded-lg'
      />
    </form>
  );
}
