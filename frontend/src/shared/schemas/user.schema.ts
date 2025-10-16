import { z } from 'zod'

export const CreateUserUpdateSchema = () => {

  return z.object({
    firstname: z.string()
      .trim()
      .optional(),
    lastname: z.string()
      .trim()
      .optional(),
    passportNumber: z.string()
      .length(10)
      .optional(),
    phone: z.string()
      .min(10)
      .optional(),
    dateBirth: z.date()
      .max(new Date())
      .optional(),
  }).refine(data => {
    if ((!data.firstname && !data.lastname) || (data.firstname && data.lastname)) return true;
    return false;
  }, {
    message: "Firstname or Lastname can't be empty if one of them filled",
    path: ['firstname', 'lastname']
  }).refine(data => Object.values(data).some(v => v !== undefined), {
    message: 'At least one field must be provided'
  })
  ;
}