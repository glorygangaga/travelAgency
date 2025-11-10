import { z } from 'zod';

export const createUserUpdateSchema = () =>
  z.object({
    username: z.string()
      .trim()
      .regex(/^\S+$/, "Username must not contain spaces")
      .optional(),
    firstname: z.string()
      .trim()
      .optional(),
    lastname: z.string()
      .trim()
      .optional(),
    passport_number: z.string()
      .optional(),
    phone: z.string()
      .optional(),
      date: z.preprocess(arg => {
        if (!arg) return undefined;
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
      }, z.date().max(new Date()).optional())
  });

export type createUserUpdateSchemaType = z.infer<ReturnType<typeof createUserUpdateSchema>>;
