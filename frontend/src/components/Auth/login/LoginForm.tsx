'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';

import { LoginAction } from './loginAction';
import { Input } from '@/components/ui/Input';
import { LoaderCircle } from 'lucide-react';

export function LoginForm() {
  const t = useTranslations();

  const [state, action, isPending] = useActionState(LoginAction, {});

  return (
    <form action={action} className='grid gap-5 justify-items-center mb-2 w-lg max-lg:w-fit'>
      <h1 className='text-3xl font-bold'>{t('Auth.Login')}</h1>
      {state.error?.global && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg'>
          <p>{state.error.global}</p>
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
        className='dark:bg-white/20 flex gap-2 max-sm:w-full bg-black/10 px-25 py-2 rounded-lg transition-colors hover:bg-black/15 dark:hover:bg-white/15'
      >
        {isPending ? (
          <>
            <LoaderCircle className='transition-transform animate-spin' /> <span>Loading</span>
          </>
        ) : (
          <>{t('Auth.Login')}</>
        )}
      </button>
    </form>
  );
}
