import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  const masterPassword = process.env.MASTER_PASSWORD || "1234";

  if (password === masterPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}