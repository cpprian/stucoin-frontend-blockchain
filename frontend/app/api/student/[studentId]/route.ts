import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);

    try {
        await db.student.update({
            where: { id: body.id },
            data: {
                university: body.university,
                faculty: body.faculty,
                yearOfStudy: body.yearOfStudy,
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error" });
    }

    return NextResponse.json({ message: "OK" });
}