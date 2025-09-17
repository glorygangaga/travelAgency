'use client';

import { lazy, useState, type FC, type FormEvent } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useModal } from '../modal/ModalProvider';
import { isEmail } from '@/functions/isEmail';
import { Input } from '../ui/Input';

const Register = lazy(() => import('./Register'));

const Login: FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [checkError, setCheckError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState({ login: '', password: '' });
  const { open } = useModal();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);

    if (!values.login.trim() || !values.password.trim() || !isEmail(values.login)) {
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
        <h1 className='text-3xl font-bold'>Вход</h1>
        {error && (
          <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg'>
            <p>Ваш адрес электронной почты и пароль не совпадают.</p>
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
        <button className='dark:bg-white/20 flex gap-2 max-sm:w-full bg-black/10 px-25 py-2 rounded-lg transition-colors hover:bg-black/15 dark:hover:bg-white/15'>
          {loading ? (
            <>
              <LoaderCircle className='transition-transform animate-spin' /> <span>Loading</span>
            </>
          ) : (
            'Войти'
          )}
        </button>
      </form>
      <button className='border-b-2' onClick={() => open(<Register />)}>
        Регистрация
      </button>
    </>
  );
};

export default Login;
