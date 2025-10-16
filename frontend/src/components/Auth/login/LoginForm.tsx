'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/Input';
import { Loader, LoaderCircle } from 'lucide-react';
import { LoginAction } from '@/actions/loginAction';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/modal/ModalProvider';
import { useUserStore } from '@/store/userStore';

export function LoginForm() {
  const t = useTranslations();
  const { push } = useRouter();
  const { close } = useModal();
  const { setUserData } = useUserStore();

  const [state, action, isPending] = useActionState(LoginAction, {});

  useEffect(() => {
    if (state.data) {
      setUserData(state.data.user);
      push('/account');
      close();
    }
  }, [state]);

  return (
    <form action={action} className='grid gap-5 justify-items-center mb-2 w-lg max-lg:w-fit'>
      <h1 className='text-3xl font-bold'>{t('Auth.Login')}</h1>
      {state.error?.global && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg'>
          <p>{state.error.global.message}</p>
        </div>
      )}
      <Input
        label={t('Auth.Email')}
        type='text'
        id='login'
        name='login'
        placeholder='example@mail.ru'
        className='w-full'
        defaultValue={state.login}
        required
        autoFocus
        error={state.error?.login}
      />
      <Input
        type='password'
        id='password'
        name='password'
        autoComplete='off'
        label={t('Auth.Password')}
        passwordToggle={true}
        className='w-full'
        required
        defaultValue={state.password}
        error={state.error?.password}
      />
      <button
        disabled={isPending}
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
