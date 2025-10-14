import { EnumTokens } from "@/shared/types/auth.types";
import { cookies } from "next/headers";

export async function checkTokenCookie() {
  const cookie = await cookies();
  const token = cookie.get(EnumTokens.ACCESS_TOKEN)?.value;

  return token ? true : false;
}