'use client';

import { useState, type FC, type FormEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useModal } from '../modal/ModalProvider';
import { isEmail } from '@/functions/isEmail';
import { Input } from '../ui/Input';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('./Login'));

const Register: FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [checkError, setCheckError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState({ login: '', password: '', confPass: '' });
  const { open } = useModal();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);

    if (
      !values.login.trim() ||
      !values.password.trim() ||
      !values.confPass.trim() ||
      !isEmail(values.login) ||
      values.password.trim() !== values.confPass.trim()
    ) {
      setCheckError(true);
      return;
    }
    setCheckError(false);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 3000);
  }

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className='grid gap-5 justify-items-center mb-2 w-lg max-lg:w-fit'
      >
        <h1 className='text-3xl font-bold'>Регистрация</h1>
        {error && (
          <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10'>
            <p>Не удалось создать аккаунт. Попробуйте позже.</p>
          </div>
        )}

        <Input
          label='Email'
          type='text'
          id='login'
          name='login'
          placeholder='example@mail.ru'
          className='w-full'
          value={values.login}
          onChange={(e) => setValues((prev) => ({ ...prev, login: e.target.value }))}
          error={
            checkError
              ? !values.login.trim()
                ? 'Введите эмейл'
                : !isEmail(values.login)
                ? 'Введите валидный эмейл'
                : ''
              : ''
          }
        />
        <Input
          type='password'
          id='password'
          name='password'
          autoComplete='off'
          label='Пароль'
          passwordToggle={true}
          className='w-full'
          value={values.password}
          onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))}
          error={checkError ? (!values.password.trim() ? 'Введите пароль' : '') : ''}
        />
        <Input
          type='password'
          id='passwordVerify'
          name='passwordVerify'
          autoComplete='off'
          label='Повторите пароль'
          passwordToggle={true}
          className='w-full'
          value={values.confPass}
          onChange={(e) => setValues((prev) => ({ ...prev, confPass: e.target.value }))}
          error={
            checkError
              ? !values.password.trim()
                ? 'Подтвердите пароль'
                : values.password.trim() !== values.confPass.trim()
                ? 'Введен не тот же пароль'
                : ''
              : ''
          }
        />
        <button className='dark:bg-white/20 flex gap-2 bg-black/10 px-25 py-2 rounded-lg transition-colors hover:bg-black/15 dark:hover:bg-white/15 max-lg:text-sm'>
          {loading ? (
            <>
              <LoaderCircle className='transition-transform animate-spin' /> <span>Loading</span>
            </>
          ) : (
            'Регистрация'
          )}
        </button>
      </form>
      <button className='border-b-2' onClick={() => open(<Login />)}>
        Вход
      </button>
    </>
  );
};

export default Register;
