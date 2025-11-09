import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/role`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!res.ok) return NextResponse.json(null);
    const data = (await res.text()) as 'admin' | 'user' | 'manager';
    return NextResponse.json({data});
  } catch (error) {
    console.error(error);
    return NextResponse.json(null);
  }
}
