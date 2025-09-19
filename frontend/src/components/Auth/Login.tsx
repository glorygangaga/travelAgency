'use client';

import { lazy, Suspense, useState, type FC, type FormEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useModal } from '../modal/ModalProvider';
import { isEmail } from '@/functions/isEmail';
import { Input } from '../ui/Input';

const Register = lazy(() => import('./Register'));

const Login: FC = () => {
  const t = useTranslations();
  const [values, setValues] = useState({ login: '', password: '', error: '', checkError: false });
  const { open } = useModal();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValues((prev) => ({ ...prev, error: '' }));

    if (!values.login.trim() || !values.password.trim() || !isEmail(values.login)) {
      setValues((prev) => ({ ...prev, checkError: true }));
      return;
    }
    setValues((prev) => ({ ...prev, checkError: false }));
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='grid gap-5 justify-items-center mb-2 w-lg max-lg:w-fit'
      >
        <h1 className='text-3xl font-bold'>{t('Auth.Login')}</h1>
        {values.error && (
          <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg'>
            <p>Ваш адрес электронной почты и пароль не совпадают.</p>
          </div>
        )}
        <Input
          label={t('Auth.Email')}
          type='text'
          id='login'
          name='login'
          placeholder='example@mail.ru'
          className='w-full'
          value={values.login}
          onChange={(e) => setValues((prev) => ({ ...prev, login: e.target.value }))}
          required
          error={
            values.checkError
              ? !values.login.trim()
                ? t('Auth.ERRORS.ENTER_EMAIL')
                : !isEmail(values.login)
                ? t('Auth.ERRORS.VALID_EMAIL')
                : ''
              : ''
          }
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
          value={values.password}
          onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
          error={
            values.checkError ? (!values.password.trim() ? t('Auth.ERRORS.ENTER_PASS') : '') : ''
          }
        />
        <button className='dark:bg-white/20 flex gap-2 max-sm:w-full bg-black/10 px-25 py-2 rounded-lg transition-colors hover:bg-black/15 dark:hover:bg-white/15'>
          {false ? (
            <>
              <LoaderCircle className='transition-transform animate-spin' /> <span>Loading</span>
            </>
          ) : (
            <>{t('Auth.Login')}</>
          )}
        </button>
      </form>
      <button
        disabled={false}
        className='border-b-2'
        onClick={() =>
          open(
            <Suspense>
              <Register />
            </Suspense>,
          )
        }
      >
        {t('Auth.Register')}
      </button>
    </>
  );
};

export default Login;
