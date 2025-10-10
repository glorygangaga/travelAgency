import { EnumTokens } from "@/shared/types/auth.types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = await cookies();
  const token = cookie.get(EnumTokens.ACCESS_TOKEN)?.value;

  if (!token)
    return NextResponse.json({error: 'Unauthorized user without token'}, {status: 401});

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
    method: "GET",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  const data = await response.json();

  if (!response.ok)
    return NextResponse.json({error: data.message}, {status: data.statusCode});

  return NextResponse.json(data, {status: 200});
}