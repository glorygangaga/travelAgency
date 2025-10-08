'use server';

import { z } from 'zod'
import { getTranslations } from 'next-intl/server';

export type LoginActionType = {
  login?: string;
  password?: string;
  error?: {
    login?: string;
    password?: string;
    global?: string;
  }
}

export async function LoginAction(_prevState: {}, formData: FormData): Promise<LoginActionType> {
  const t = await getTranslations('Auth.ERRORS');

  const login = formData.get('login') as string;
  const password = formData.get('password') as string;

  const LoginSchema = z.object({
    login: z.string()
      .trim()
      .regex(/\S+/, t("ENTER_EMAIL"))
      .email(t("VALID_EMAIL")),
    password: z.string()
      .trim()
      .regex(/\S+/, t("ENTER_PASS"))
  });


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
  

  return {login, password};
};