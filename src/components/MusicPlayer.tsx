import Image from 'next/image';
import React from 'react';
interface Props {
    UrlImage: string;
    title: string;
    artist: string;
    className?: string;
}

const MusicPlayer: React.FC<Props> = ({ UrlImage, title, artist }) => {
    return (
            <div>
                <Image src={UrlImage} width={400} height={400} alt='/no-music.png' className='rounded-[10]' />
                <h1 className='font-bold text-2xl'>{title}</h1>
                <p>{artist}</p>
            </div>
    )
};

export default MusicPlayer;