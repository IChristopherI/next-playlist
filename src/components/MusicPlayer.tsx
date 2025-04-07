import Image from 'next/image';
import React from 'react';
interface Props {
    UrlImage: string;
    title: string;
    artist: string;
}

const MusicPlayer: React.FC<Props> = ({ UrlImage, title, artist }) => {
    return (
            <>
                <Image src={UrlImage} width={400} height={400}  alt='MusicImage' priority />
                <h1 className='font-bold text-2xl'>{title}</h1>
                <p>{artist}</p>
            </>
    )
};

export default MusicPlayer;