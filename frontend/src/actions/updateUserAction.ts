'use server';

import { api, ApiError } from "@/app/api/api.routes";
import { GetNumbersFromString } from "@/functions/OnlyNumbers";
import { CreateUserUpdateSchema } from "@/shared/schemas/user.schema";
import { updateUserActionType, UserTypeUpdate } from "@/shared/types/user.types";

const fields = ['usernameval', 'firstname', 'lastname', 'passportNumber', 'phoneval', 'date'] as const;

export async function UpdateUserAction(_prevState: {}, formData: FormData): Promise<updateUserActionType> {
  const data = Object.fromEntries(
    fields.map((key) => [key, formData.get(key)])
  );
  
  const userData = {
    firstname: data.firstname as string | undefined,
    lastname: data.lastname as string | undefined,
    passportNumber: GetNumbersFromString(data.passportNumber as string | undefined),
    phone: GetNumbersFromString(data.phoneval as string | undefined),
    dateBirth: data.date ? new Date(data.date as string) : undefined,
  };

  const userUpdateSchema = CreateUserUpdateSchema();
  const validatedFields = userUpdateSchema.safeParse(userData);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const errorFields = ['firstname', 'lastname', 'passportNumber', 'phone', 'dateBirth'] as const;
    type errorTypes = "firstname" | "lastname" | "passportNumber" | "phone" | "dateBirth";
    
    const errors = Object.fromEntries(
      errorFields.map((field) => [field, fieldErrors[field]?.[0] ?? undefined])
    ) as Record<errorTypes, string>;
    
    return {...userData, error: errors}
  }

  try {
    const body: UserTypeUpdate = {
      fullname: userData.firstname + ' ' + userData.lastname,
      date: userData.dateBirth,
      passport_number: userData.passportNumber,
      phone: userData.phone
    }

    const data = await api.user.profileUpdate(body);

    return {data};
  } catch(error) {

    if (error instanceof ApiError) return {...userData, error: {global: {message: error.message, status: error.status}},};
    else return {...userData, error: {global: {message: "Internal Server Error", status: 500}}};
  }
}