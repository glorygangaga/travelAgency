'use client';

import { useActionState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { LoaderCircle } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { RegisterAction } from '@/actions/registerAction';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { useModal } from '@/components/modal/ModalProvider';

export function RegisterForm() {
  const { push } = useRouter();
  const { close } = useModal();
  const { setUserData } = useUserStore();
  const [state, action, isPending] = useActionState(RegisterAction, {});
  const t = useTranslations();

  useEffect(() => {
    if (state.data) {
      setUserData(state.data.user);
      push('/account');
      close();
    }
  }, [state]);

  return (
    <form action={action} className='grid gap-5 justify-items-center mb-2 w-lg max-lg:w-fit'>
      <h1 className='text-3xl font-bold'>{t('Auth.Register')}</h1>
      {state.error?.global && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10'>
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
        error={state.error?.login}
        required
        autoFocus
      />
      <Input
        type='password'
        id='password'
        name='password'
        autoComplete='off'
        label={t('Auth.Password')}
        passwordToggle={true}
        className='w-full'
        defaultValue={state.password}
        error={state.error?.password}
        required
      />
      <Input
        type='password'
        id='passwordVerify'
        name='passwordVerify'
        autoComplete='off'
        label={t('Auth.ConfPassword')}
        passwordToggle={true}
        className='w-full'
        defaultValue={state.confPassword}
        error={state.error?.confPassword}
        required
      />
      <button
        disabled={isPending}
        type='submit'
        className='dark:bg-white/20 flex gap-2 w-1/2 justify-center max-sm:w-full bg-black/10 px-25 py-2 rounded-lg transition-colors hover:bg-black/15 dark:hover:bg-white/15'
      >
        {isPending ? (
          <LoaderCircle className='transition-transform animate-spin duration-1000' />
        ) : (
          <>{t('Auth.Register')}</>
        )}
      </button>
    </form>
  );
}
