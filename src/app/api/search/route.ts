import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req:NextRequest) {
    try {
        const query = req.nextUrl.searchParams.get('query') || '';


        const items = await prisma.track.findMany({
            where:{
                title:{
                    contains:query,
                    mode:'insensitive',
                }
            }
        })

        return NextResponse.json(items)

    } catch (error) {
        console.log('SEARCH_ITEMS', error)
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
    }

}