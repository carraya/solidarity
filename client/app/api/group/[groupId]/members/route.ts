import { getGroupMembers } from "@/lib/group/group";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const members = await getGroupMembers(params.groupId);

    if (!members) {
      return NextResponse.json(
        { message: "Group members not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ members }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Group members retrieval failed", error: error.message },
      { status: 500 }
    );
  }
}
