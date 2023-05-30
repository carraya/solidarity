import { getGroupAdmins } from "@/lib/group/group";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const admins = await getGroupAdmins(params.groupId);

    if (!admins) {
      return NextResponse.json(
        { message: "Admins not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ admins }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Admins retrieval failed", error: error.message },
      { status: 500 }
    );
  }
}
