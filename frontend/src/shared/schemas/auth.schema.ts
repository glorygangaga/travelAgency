import { z } from 'zod'
import { getTranslations } from 'next-intl/server';

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .regex(/\S+/, t('Auth.ERRORS.ENTER_EMAIL'))
      .email(t('Auth.ERRORS.VALID_EMAIL')),
    password: z
      .string()
      .trim()
      .min(6, t('Auth.ERRORS.PASS_MIN_6'))
      .regex(/\S+/, t('Auth.ERRORS.ENTER_PASS')),
  });


export type LoginSchemaType = z.infer<ReturnType<typeof createLoginSchema>>;

export const createRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z
        .string()
        .trim()
        .regex(/\S+/, t('Auth.ERRORS.ENTER_EMAIL'))
        .email(t('Auth.ERRORS.VALID_EMAIL')),
      password: z
        .string()
        .trim()
        .min(6, t('Auth.ERRORS.PASS_MIN_6'))
        .regex(/\S+/, t('Auth.ERRORS.ENTER_PASS')),
      confPassword: z
        .string()
        .trim()
        .min(6, t('Auth.ERRORS.PASS_MIN_6'))
        .regex(/\S+/, t('Auth.ERRORS.REPEAT_PASS')),
    })
    .refine((data) => data.password === data.confPassword, {
      message: t('Auth.ERRORS.PASS_SAME'),
      path: ['confPassword'],
    });

export type RegisterSchemaType = z.infer<ReturnType<typeof createRegisterSchema>>;
