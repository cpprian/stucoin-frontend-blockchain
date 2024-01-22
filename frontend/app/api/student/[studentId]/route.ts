import { NextResponse } from "next/server";

import { db } from "lib/db";

export async function GET(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  const id = params.studentId;
  try {
    const student = await db.student.findFirst({
      where: {
        userId: id,
      },
    });

    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}