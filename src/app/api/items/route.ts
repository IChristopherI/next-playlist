import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {}

export async function GET() {
    try {
        const tracks = await prisma.track.findMany({
          include: {
            user: true,
            playlists: true,
            category: true, 
          },
        });
    
        return NextResponse.json(tracks);
      } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Ошибка при получении песен" },{ status: 500 });
      } 
}