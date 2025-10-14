'use server';

import { cookies } from 'next/headers';
import { CreateRegisterSchema } from '@/shared/schemas/auth.schema';
import { EnumTokens, RegisterActionType } from '@/shared/types/auth.types';
import { api, ApiError } from '@/app/api/api.routes';

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
    const data = await api.auth.register({login, password});

    if (data.accessToken) {
      const cookie = await cookies();
      cookie.set(EnumTokens.ACCESS_TOKEN, data.accessToken, {
        path: '/',
        sameSite: 'lax',
      });
    };

    return {data};
  } catch (error) {
    if (error instanceof ApiError) return {login, confPassword: '', password: '', error: {global: {message: error.message, status: error.status}}}
    else return {login, password, error: {global: {message: "Internal Server Error", status: 500}}}
  }
}