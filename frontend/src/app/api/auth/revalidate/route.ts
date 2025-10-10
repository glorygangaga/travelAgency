import {  NextResponse } from "next/server";
import { AUTH_BASE_URL } from "../auth.data";

export async function POST() {
  const response = await fetch(`${AUTH_BASE_URL}/login/access-token`, {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok)
    return NextResponse.json({error: data.message}, {status: data.statusCode});

  return NextResponse.json({success: true}, {status: 200});
}