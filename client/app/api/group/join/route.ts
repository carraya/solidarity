import { joinGroup } from "@/lib/group/join";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const groupInvite = (await req.json()) as any; // TODO: create interface
    const message = await joinGroup(
      groupInvite.groupId,
      groupInvite.userId,
      groupInvite.invitationCode
    );
    return NextResponse.json({ message }, { status: 200 });
  } catch (error: any) {
    NextResponse.json(
      { message: "Group join failed", error: error.message },
      { status: 500 }
    );
  }
}
