import { getGroup } from "@/lib/group/group";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const group = await getGroup(params.groupId);

    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    return NextResponse.json({ group }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Group retrieval failed", error: error.message },
      { status: 500 }
    );
  }
}
