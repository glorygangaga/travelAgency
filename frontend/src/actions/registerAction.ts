'use server';

import { cookies } from 'next/headers';
import { CreateRegisterSchema } from '@/shared/schemas/auth.schema';
import { AuthRegisterResponse, EnumTokens, RegisterActionType } from '@/shared/types/auth.types';

export async function RegisterAction(_prevState: {}, formData: FormData): Promise<RegisterActionType> {
  const login = formData.get('login') as string;
  const password = formData.get('password') as string;
  const confPassword = formData.get('passwordVerify') as string;

  const registerSchema = await CreateRegisterSchema();

  const validatedFields = registerSchema.safeParse({login, password, confPassword});

  if (!validatedFields.success)
  {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;

    return {
      login, password, confPassword,
      error: {
        login: fieldErrors.login?.[0],
        password: fieldErrors.password?.[0],
        confPassword: fieldErrors.confPassword?.[0],
      }
    }
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({email: login, password})
    });
    const data: AuthRegisterResponse  = await res.json();

    if (!res.ok) {
      return {
        login, confPassword, password, error: {global: {message: res.statusText, status: res.status}}
      }
    }

    if (data.accessToken) {
      const cookie = await cookies();
      cookie.set(EnumTokens.ACCESS_TOKEN, data.accessToken, {
        path: '/',
        sameSite: 'lax',
      });
    };

    return {login, password, confPassword, data};
  } catch (error) {
    console.error('Login action error:', error);
  }


  return {login, password, confPassword};
}