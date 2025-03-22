'use client'

import React, { useEffect, useState } from 'react';
import { useUploadStore } from '../store/items';
import Image from 'next/image';
import { Timer } from 'lucide-react';

interface Props {
    className?: string;
}

const Music: React.FC<Props> = () => {
    const { items, loading, error, fetchItems } = useUploadStore();
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const playMusic = (url: string) => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        const newAudio = new Audio(url);
        newAudio.play();

        setAudio(newAudio);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred while fetching items.</div>;
    }

    return (
        <div className="max-w-[980px] rounded-[10] w-full h-screen bg-neutral-800 m-3 p-4">
            {items.length === 0 ? (
                <div className="text-center text-white text-xl">No items available.</div>
            ) : (
                <table className="min-w-full table-auto text-left">
                    <thead className='border-b'>
                        <tr>
                            <th>#</th>
                            <th className="text-white py-3 px-4">Название</th>
                            <th className="text-white py-3 px-4"><Timer /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr
                                key={index}
                                className=" border-neutral-700 hover:bg-neutral-700 cursor-pointer transition duration-300 ease-in-out transform"
                                onClick={() => playMusic(item.Url)}
                            >
                                <td>{index + 1}</td>
                                <td className="py-3 px-4 flex gap-3">
                                    {item.UrlImage && (
                                        <Image
                                            src={item.UrlImage}
                                            alt={item.title}
                                            width={70}
                                            height={70}
                                            className="rounded-[10] shadow-lg"
                                        />
                                        
                                    )}
                                    <p>{item.title}</p>
                                    <p>{item.artist}</p>
                                </td>
                                <td className="py-3 px-4 text-white">{item.duration} s</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>


    );
};

export default Music;
