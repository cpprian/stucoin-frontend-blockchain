import { NextResponse } from "next/server";

import { db } from "lib/db";

export async function GET(
  req: Request,
  { params }: { params: { teacherId: string } }
) {
  const id = params.teacherId;
  try {
    const teacher = await db.teacher.findFirst({
      where: {
        userId: id,
      },
    });

    return NextResponse.json(teacher);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}