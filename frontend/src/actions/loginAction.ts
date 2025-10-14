'use server';

import { cookies } from 'next/headers';
import { EnumTokens, LoginActionType } from '@/shared/types/auth.types';
import { CreateLoginSchema } from '@/shared/schemas/auth.schema';
import { api, ApiError } from '@/app/api/api.routes';

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
    const data = await api.auth.login({login, password});
    
    if (data.accessToken) {
      const cookie = await cookies();
      cookie.set(EnumTokens.ACCESS_TOKEN, data.accessToken, {
        path: '/',
        sameSite: 'lax',
      });
    };

    return {data};
  } catch(error) {
    if (error instanceof ApiError) return {login, password: '', error: {global: {message: error.message, status: error.status}}}
    else return { login, password, error: {global: {message: "Internal Server Error", status: 500}}}
  }
};