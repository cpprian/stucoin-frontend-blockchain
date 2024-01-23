import { db } from "lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);

    try {
        await db.user.update({
            where: { id: body.id },
            data: {
                name: body.name,
                surname: body.surname,
                email: body.email,
                bio: body.bio,
                walletAddress: body.wallet,
            },
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error" });
    }

    return NextResponse.json({ message: "OK" });
}