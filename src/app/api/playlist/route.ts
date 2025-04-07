import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.json({message:'Пользователь не найден'}, { status: 401 });
        }
        const playlists = await prisma.playlist.findMany({
            where: {
                user: {
                    token: token,

                },
            },
            include: {
                tracks: true, 
            },
        });

        if (!playlists) {
            return NextResponse.json({ message: 'Плейлисты не найдены' }, { status: 404 });
        }
        return NextResponse.json(playlists);
    } catch (error) {
        console.error('Ошибка при получении плейлистов:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
