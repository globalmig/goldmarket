import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  const masterPassword = process.env.MASTER_PASSWORD || "1234";

  console.log("입력된 비번:", password);
  console.log("마스터 비번:", masterPassword);

  if (password === masterPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}