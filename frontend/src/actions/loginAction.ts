'use server';

import { EnumTokens, LoginActionType } from '@/shared/types/auth.types';
import { CreateLoginSchema } from '@/shared/schemas/auth.schema';
import { cookies } from 'next/headers';

export async function LoginAction(_prevState: {}, formData: FormData): Promise<LoginActionType> {
  const login = formData.get('login') as string;
  const password = formData.get('password') as string;

  const LoginSchema = await CreateLoginSchema();

  const validatedFields = LoginSchema.safeParse({login, password});

  
  if (!validatedFields.success){
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      login, password,
      error: {
        login: fieldErrors.login?.[0],
        password: fieldErrors.password?.[0]
      },
    };
  }
  
  try  {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({email: login, password})
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        login,
        password: '',
        error: {global: {message: res.statusText, status: res.status}}
      }
    }

    if (data.accessToken) {
      const cookie = await cookies();
      cookie.set(EnumTokens.ACCESS_TOKEN, data.accessToken, {
        path: '/',
        sameSite: 'lax',
      });
    };

    return {login, password, data};
  } catch(error) {
    console.error('Login action error:', error);
  }


  return {login, password};
};