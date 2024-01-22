import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);

    try {
        await db.student.update({
            where: { userId: body.id },
            data: {
                university: body.university,
                faculty: body.faculty,
                yearOfStudy: Number(body.yearOfStudy),
                totalScore: Number(body.points),
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }

    return NextResponse.json({ message: "OK" });
}