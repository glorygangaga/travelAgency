import { z } from 'zod';

export const createUserUpdateSchema = () =>
  z.object({
    firstname: z.string()
      .trim()
      .optional(),
    lastname: z.string()
      .trim()
      .optional(),
    passport_number: z.string()
      .length(12)
      .optional(),
    phone: z.string()
      .length(18)
      .optional(),
      date: z.preprocess(arg => {
        if (!arg) return undefined;
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
      }, z.date().max(new Date()).optional())
  });

export type createUserUpdateSchemaType = z.infer<ReturnType<typeof createUserUpdateSchema>>;
