import { NextResponse } from "next/server";
import { EnumTokens } from "@/shared/types/auth.types";
import { api } from "../../api.routes";

export async function POST() {
  await api.auth.logout();

  const res = NextResponse.json({ success: true }, { status: 200 });
  res.cookies.delete(EnumTokens.ACCESS_TOKEN);
  
  return res;
}
