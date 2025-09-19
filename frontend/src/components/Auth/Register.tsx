'use client';

import { lazy, Suspense, useState, type FC, type FormEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useModal } from '../modal/ModalProvider';
import { isEmail } from '@/functions/isEmail';
import { Input } from '../ui/Input';

const Login = lazy(() => import('./Login'));

const Register: FC = () => {
  const t = useTranslations();
  const [values, setValues] = useState({
    login: '',
    password: '',
    confPass: '',
    error: '',
    checkError: false,
  });
  const { open } = useModal();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setValues((prev) => ({ ...prev, error: '' }));

    if (
      !values.login.trim() ||
      !values.password.trim() ||
      !values.confPass.trim() ||
      !isEmail(values.login) ||
      values.password.trim() !== values.confPass.trim()
    ) {
      setValues((prev) => ({ ...prev, checkError: true }));
      return;
    }
    setValues((prev) => ({ ...prev, checkError: false }));
  }

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='grid gap-5 justify-items-center mb-2 w-lg max-lg:w-fit'
      >
        <h1 className='text-3xl font-bold'>{t('Auth.Register')}</h1>
        {values.error && (
          <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10'>
            <p>Не удалось создать аккаунт. Попробуйте позже.</p>
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
          value={values.password}
          onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
          error={
            values.checkError ? (!values.password.trim() ? t('Auth.ERRORS.ENTER_PASS') : '') : ''
          }
        />
        <Input
          type='password'
          id='passwordVerify'
          name='passwordVerify'
          autoComplete='off'
          label={t('Auth.ConfPassword')}
          passwordToggle={true}
          className='w-full'
          value={values.confPass}
          onChange={(e) => setValues((prev) => ({ ...prev, confPass: e.target.value }))}
          error={
            values.checkError
              ? !values.password.trim()
                ? t('Auth.ERRORS.REPEAT_PASS')
                : values.password.trim() !== values.confPass.trim()
                ? t('Auth.ERRORS.PASS_SAME')
                : ''
              : ''
          }
        />
        <button className='dark:bg-white/20 flex gap-2 bg-black/10 px-25 py-2 rounded-lg transition-colors hover:bg-black/15 dark:hover:bg-white/15 max-lg:text-sm'>
          {false ? (
            <>
              <LoaderCircle className='transition-transform animate-spin' /> <span>Loading</span>
            </>
          ) : (
            <>{t('Auth.Register')}</>
          )}
        </button>
      </form>
      <button
        className='border-b-2'
        onClick={() =>
          open(
            <Suspense>
              <Login />
            </Suspense>,
          )
        }
      >
        {t('Auth.Login')}
      </button>
    </>
  );
};

export default Register;
