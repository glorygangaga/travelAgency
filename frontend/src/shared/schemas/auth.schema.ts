import { z } from 'zod'
import { getTranslations } from 'next-intl/server';

export const CreateLoginSchema = async () => {
  const t = await getTranslations('Auth.ERRORS');
  return z.object({
    login: z.string()
      .trim()
      .regex(/\S+/, t("ENTER_EMAIL"))
      .email(t("VALID_EMAIL")),
    password: z.string()
      .trim()
      .min(6, t("PASS_MIN_6"))
      .regex(/\S+/, t("ENTER_PASS"))
  });
}

export const CreateRegisterSchema = async () => {
  const t = await getTranslations('Auth.ERRORS');
  
  return z.object({
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
}