import { createGroup } from "@/lib/group/create";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const groupData = (await req.json()) as any; // TODO: create interface
    const groupId = await createGroup(
      groupData.name,
      groupData.description,
      groupData.organizerId,
      groupData.cryptoWalletCode
    );
    return NextResponse.json({ groupId }, { status: 200 });
  } catch (error: any) {
    NextResponse.json(
      { message: "Group creation failed", error: error.message },
      { status: 500 }
    );
  }
}
