import { NextResponse } from "next/server";

import { db } from "lib/db";

export async function GET(
  req: Request,
  { params }: { params: { studentId: string } }
) {
  try {
    const students = await db.user.findMany({
        select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            student: {
                select: {
                    totalScore: true,
                }, 
            }
        },
        orderBy: {
            student: {
                totalScore: "desc",
            }
        },
        where: {
            student: {
                totalScore: {
                    gt: 0,
                }
            }
        }
    });

    console.log(students);

    return NextResponse.json(students);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}