import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);

    if (body.newPassword !== body.confirmPassword) {
        return NextResponse.json({ message: "Error" });
    }

    try {
        await db.user.update({
            where: { id: body.id },
            data: {
                password: body.newPassword,
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error" });
    }

    return NextResponse.json({ message: "OK" });
}