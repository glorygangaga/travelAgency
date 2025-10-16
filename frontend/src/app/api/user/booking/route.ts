import { NextResponse } from "next/server";
import { checkTokenCookie } from "../../api.auth";
import { api, ApiError } from "../../api.routes";

export async function GET() {
  const isAuth = await checkTokenCookie();
  if (!isAuth) return NextResponse.json({error: 'Unauthorized user without token'}, {status: 401});

  try {
    const response = await api.user.getBookings();
    return NextResponse.json(response, {status: 200});
  } catch(error) {
    if (error instanceof ApiError)
      return NextResponse.json({ error: error.message }, { status: error.status });
  }

  return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });

}