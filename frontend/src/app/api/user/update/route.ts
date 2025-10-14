import { NextRequest, NextResponse } from "next/server";
import { checkTokenCookie } from "../../api.auth";
import { api, ApiError } from "../../api.routes";
import { UserTypeUpdate } from "@/shared/types/user.types";

export async function PUT(req: NextRequest) {
  const isAuth = await checkTokenCookie();
  if (!isAuth) return NextResponse.json({error: 'Unauthorized user without token'}, {status: 401});

  try {
    const body: UserTypeUpdate = await req.json();
    const res = await api.user.profileUpdate(body);
    return NextResponse.json(res, {status: 200});
  } catch(error) {
    if (error instanceof ApiError)
      return NextResponse.json({ error: error.message }, { status: error.status });
  }
}