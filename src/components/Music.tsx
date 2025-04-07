'use client'

import React, { useEffect, useState } from 'react';
import { useUploadStore } from '../store/items';
import Image from 'next/image';
import { AlignLeft, CirclePlus, List, PlusIcon, Timer } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';

interface Props {
    id: string;
    UrlImage: string;
    className?: string;
    title: string;
    artist: string;
    duration: number;
    index: number;
    onSubmit?: (event: React.FormEvent) => void;
    show: boolean;

}

const Music: React.FC<Props> = ({ id, UrlImage, title, artist, duration, index, onSubmit, show }) => {

    const { togglePlay, currentSong } = useUploadStore();

    const handlePlay = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        togglePlay(id);
    };

   
    const isActive = currentSong?.id === id;
    return (
        <>
            <tr onClick={handlePlay} className="cursor-pointer hover:bg-neutral-800 ">
                <td className="py-3 px-4">{isActive ? <AlignLeft color='green' /> : `${index + 1}`}</td>
                <td className="py-3 px-4 flex gap-4">
                    <Image src={UrlImage} height={50} width={50} alt={title} />
                    <p className={cn('', isActive && 'text-green-500')}>{title}</p>
                    <p className='text-gray-300'>{artist}</p>
                </td>

                <td className="  py-3 px-4 text-white">{duration}</td>
                <td>
                    { show && (
                        <CirclePlus  onClick={onSubmit}/>
                    )}
                </td>
            </tr>
        </>
    );
};

export default Music;
