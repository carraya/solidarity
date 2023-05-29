import { NextResponse, NextRequest } from "next/server";
import { login } from "@/lib/user/login";

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
    const isAuthenticated = await login(userId, password);

    if (isAuthenticated) {
      return NextResponse.json(
        { message: "User authentication successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: "User authentication failed", error: error.message },
      { status: 500 }
    );
  }
}
