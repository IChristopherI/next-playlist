import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json("Пользователь не найден", { status: 401 });
        }

        const playlist = await prisma.playlist.findFirst({
            where: { id: id },
            include: {
                tracks: {
                    include: {
                        track: true,
                    },
                },
            },
        }
        );
        if (!playlist) {
            return NextResponse.json("Плейлист не найден", { status: 404 });
        }

        return NextResponse.json(playlist, { status: 200 });
    } catch (error) {
        console.error("Error fetching playlist:", error);
        return NextResponse.json({ error: "Failed to fetch playlist" }, { status: 500 });
    }

}
