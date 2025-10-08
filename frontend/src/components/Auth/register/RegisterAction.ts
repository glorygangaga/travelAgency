'use server';

import {z} from 'zod'
import { getTranslations } from 'next-intl/server';

export type RegisterActionType = {
  login?: string;
  password?: string;
  confPassword?: string;
  error?: {
    login?: string;
    password?: string;
    confPassword?: string;
    global?: string;
  }
}


export async function RegisterAction(_prevState: {}, formData: FormData): Promise<RegisterActionType> {
  const t = await getTranslations('Auth.ERRORS');

  const login = formData.get('login') as string;
  const password = formData.get('password') as string;
  const confPassword = formData.get('passwordVerify') as string;

  const registerSchema = z.object({
    login: z.string()
      .trim()
      .regex(/\S+/, t("ENTER_EMAIL"))
      .email(t("VALID_EMAIL")),
    password: z.string()
      .trim()
      .min(6, t("PASS_MIN_6"))
      .regex(/\S+/, t("ENTER_PASS")),
      confPassword: z.string()
      .trim()
      .min(6, t("PASS_MIN_6"))
      .regex(/\S+/, t("REPEAT_PASS"))
  }).refine((data) => data.password === data.confPassword, {
    message: t("PASS_SAME"),
    path: ['confPassword']
  })

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

  return {login, password, confPassword};
}