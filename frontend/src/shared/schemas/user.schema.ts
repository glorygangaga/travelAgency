import { z } from 'zod'

export const CreateUserUpdateSchema = () => {

  return z.object({
    firstname: z.string()
      .trim()
      .regex(/\S+/),
    lastname: z.string()
      .trim()
      .regex(/\S+/),
    passportNumber: z.string()
      .length(20),
    phone: z.string()
      .min(10),
    dateBirth: z.date()
      .max(new Date())
  }).refine(data => data.firstname.length > 0 && data.lastname.length > 0, {
    message: '',
    path: ['firstname', 'lastname']
  });
}