import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fwae`, {headers: {Authorization: `Bearer ${token}`}});

  if (!res.ok)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await res.json();
  return NextResponse.json(user);
}