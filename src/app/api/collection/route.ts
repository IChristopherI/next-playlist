import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }

        const collections = await prisma.collection.findMany({
            where: { token },
            include: {
                tracks: {
                    include: {
                        track: true
                    }
                }
            }
        });

        return NextResponse.json(collections, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { trackId } = await req.json();
        let token = req.cookies.get("token")?.value;

        if (!token) {
            token = crypto.randomUUID();
        }


        let userCollection = await prisma.collection.findFirst({
            where: {
                token,
            },
        });

        if (!userCollection) {
            userCollection = await prisma.collection.create({
                data: {
                    token,
    
                },
            });
        }

        const trackExists = await prisma.collectionTrack.findFirst({
            where: {
                collectionId: userCollection.id,
                trackId,
            },
        });

        if (trackExists) {
            return NextResponse.json(
                { message: "Track already in favorites" },
                { status: 200 }
            );
        }

        await prisma.collectionTrack.create({
            data: {
                collectionId: userCollection.id,
                trackId,
            },
        });

        const response = NextResponse.json({ message: "Track added to favorites" }, { status: 201 });
        response.cookies.set('token', token);
        return response;
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
