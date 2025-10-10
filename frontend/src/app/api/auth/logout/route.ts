import { NextResponse } from "next/server";
import { AUTH_BASE_URL } from "../auth.data";
import { cookies } from "next/headers";
import { EnumTokens } from "@/shared/types/auth.types";

export async function POST() {
  const response = await fetch(`${AUTH_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok)
    return NextResponse.json({error: data.message}, {status: data.statusCode});

  const cookie = await cookies();

  cookie.set(EnumTokens.ACCESS_TOKEN, '', {
    expires: new Date(0),
    sameSite: 'lax'
  });

  return NextResponse.json({success: true}, {status: 200});
}
