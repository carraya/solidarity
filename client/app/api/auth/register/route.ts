import { NextResponse, NextRequest } from "next/server";
import { register } from "@/lib/user/register";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const userData = (await req.json()) as any;
  const { userId, password } = userData;

  try {
    await register(userId, password);
    return NextResponse.json(
      { message: "User registration successful" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "User registration failed", error: error.message },
      { status: 500 }
    );
  }
}
