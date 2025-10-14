import { NextResponse } from "next/server";
import { api, ApiError } from "../../api.routes";
import { checkTokenCookie } from "../../api.auth";

export async function GET() {
  const isAuth = await checkTokenCookie();
  if (!isAuth) return NextResponse.json({error: 'Unauthorized user without token'}, {status: 401});

  try {
    const response = await api.user.profile();
    return NextResponse.json(response, {status: 200});
  } catch(error) {
    if (error instanceof ApiError)
      return NextResponse.json({ error: error.message }, { status: error.status });
  }

  return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
}