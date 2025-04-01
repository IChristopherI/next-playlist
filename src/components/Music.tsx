'use client'

import React, { useEffect, useState } from 'react';
import { useUploadStore } from '../store/items';
import Image from 'next/image';
import { AlignLeft, List, Timer } from 'lucide-react';
import { cn } from '../lib/utils';

interface Props {
    id: string;
    Url: string;
    UrlImage: string;
    className?: string;
    title: string;
    artist: string;
    duration: number;
    index: number;
}

const Music: React.FC<Props> = ({id, Url, UrlImage, title, artist, duration, index }) => {

    const { togglePlay, currentSong } = useUploadStore();

    const handlePlay = () => {
        togglePlay(id);
    };


    const isActive = currentSong?.id === id;
    return (

        <tr onClick={handlePlay} className="cursor-pointer hover:bg-neutral-800 ">
            <td className="py-3 px-4">{isActive ? <AlignLeft color='green' /> : `${index + 1}`}</td>
            <td className="py-3 px-4 flex gap-4">
                <Image src={UrlImage} height={50} width={50} alt={title} />
                <p className={cn('', isActive && 'text-green-500')}>{title}</p>
                <p className='text-gray-300'>{artist}</p>
            </td>

            <td className="py-3 px-4 text-white">{duration} s</td>
        </tr>


    );
};

export default Music;
