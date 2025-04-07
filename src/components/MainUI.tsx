'use client';

import React from 'react';
import { useUploadStore } from '../store/items';
import MusicPlayer from './MusicPlayer';
import Footer from './Footer';

const MainUi: React.FC = () => {
    const { currentSong } = useUploadStore();

    return <>
        <div className="ml-2 right-0 bg-neutral-900  shadow-lg p-4 m-3 rounded-[10] h-screen">
            <MusicPlayer
                title={currentSong?.title ?? ''}
                artist={currentSong?.artist ?? ''}
                UrlImage={currentSong?.UrlImage ?? '/audio.png'}
            />
        </div>
        <Footer currentSong={currentSong} />
    </>;
};

export default MainUi;