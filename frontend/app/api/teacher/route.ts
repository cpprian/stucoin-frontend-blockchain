import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);

    try {
        await db.teacher.update({
            where: { userId: body.id },
            data: {
                university: body.university,
                faculty: body.faculty,
                department: body.department,
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error" });
    }

    return NextResponse.json({ message: "OK" });
}