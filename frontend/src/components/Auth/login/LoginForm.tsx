'use client';

import { useTranslations } from 'next-intl';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/Input';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { useUserStore } from '@/store/userStore';
import { AuthTypeRequest } from '@/shared/types/auth.types';
import { authService } from '@/services/auth.service';
import { createLoginSchema } from '@/shared/schemas/auth.schema';

export function LoginForm() {
  const t = useTranslations();
  const schema = createLoginSchema(t);

  const { push } = useRouter();
  const { close } = useModal();
  const { setUserData } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthTypeRequest>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (data: AuthTypeRequest) => authService.main('login', data),
    async onSuccess(data) {
      setUserData(data.user);
      reset();
      close();
      push('/account');
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
  });

  const onSubmit: SubmitHandler<AuthTypeRequest> = (data) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid gap-5 justify-items-center mb-2 w-lg max-lg:w-fit'
    >
      <h1 className='text-3xl font-bold'>{t('Auth.Login')}</h1>
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
        required
        autoFocus
        autoComplete='off'
        error={errors.email?.message}
        {...register('email', { required: 'email is required' })}
      />
      <Input
        type='password'
        id='password'
        autoComplete='off'
        label={t('Auth.Password')}
        passwordToggle={true}
        className='w-full'
        required
        error={errors.password?.message}
        {...register('password', { required: 'password is required' })}
      />
      <button
        disabled={isSubmitting || isPending}
        type='submit'
        className='dark:bg-white/20 flex gap-2 w-1/2 justify-center max-sm:w-full bg-black/10 px-25 py-2 rounded-lg transition-colors hover:bg-black/15 dark:hover:bg-white/15'
      >
        {isPending ? (
          <LoaderCircle className='transition-transform animate-spin duration-1000' />
        ) : (
          <>{t('Auth.Login')}</>
        )}
      </button>
    </form>
  );
}
