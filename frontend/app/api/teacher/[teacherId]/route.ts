import { NextResponse } from "next/server";

import { db } from "lib/db";

export async function GET(
  req: Request,
  { params }: { params: { teacher: string } }
) {
  const id = params.teacher;
  try {
    const user = await db.teacher.findFirst({
      where: {
        userId: id,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}