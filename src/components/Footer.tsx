'use client'

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CirclePlus, Pause, Play, PlusIcon, Volume, Volume2 } from 'lucide-react';
import { ItemState, useUploadStore } from '../store/items';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import toast from 'react-hot-toast';

interface FooterProps {
    currentSong: ItemState | null;
}

const Footer: React.FC<FooterProps> = ({ currentSong }) => {
    const { currentTime, duration, isPlaying, items, volume, togglePlay, setCurrentTime, setVolume, addToPlaylist } = useUploadStore();

    const handlePlay = () => {
        if (currentSong) {
            togglePlay(currentSong.id);
        }
    };


    const handleSliderChange = (value: number[]) => {
        if (value.length > 0) {
            setCurrentTime(value[0])
        }
    }

    const NextPlay = () => {
        if(!currentSong) return;
        const songIndex = items.findIndex((item) => item.id === currentSong?.id);
        const nextIndex = (songIndex + 1) % items.length;
        togglePlay(items[nextIndex].id);
    }

    const PreviousPlay = () => {
        if(!currentSong) return;
        const findIndex = items.findIndex((item) => item.id === currentSong.id);
        const nextIndex = (findIndex - 1 + items.length) % items.length;
        togglePlay(items[nextIndex].id);

    }
    const handleVolumeChange = (value: number[]) => {
        if (value.length > 0) {
            setVolume(value[0]);
        }
    };

    const onSubmit = async ( trackId: number) => {
        try {
          await addToPlaylist(trackId);
          toast.success("Трек добавлен в плейлист");
        } catch (error) {
          toast.error("Ошибка добавления трека в плейлист");
        }
      };
   
    return (
        <>
            <div className='fixed bottom-0 w-full h-20 bg-black z-30 flex justify-between px-20 p-3'>
                <div className='flex gap-3 items-center'>
                    {currentSong ? (
                        <>
                            <Image src={currentSong.UrlImage} height={50} width={50} alt={currentSong.title} />
                            <div className='flex flex-col'>
                                <p className="text-white">{currentSong.title}</p>
                                <p className="text-gray-400">{currentSong.artist}</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-white text-center">No song playing</p>
                    )}
                    <div>
                        <CirclePlus  onClick={() => onSubmit(Number(currentSong?.id))} />
                    </div>
                </div>

                <div className='flex flex-col  items-center gap-2 w-[400px] '>
                    <div className=''>
                        <Button variant={'ghost'} onClick={PreviousPlay} className=' mr-2 rounded-[20]' ><ArrowLeft /></Button>

                        <Button onClick={handlePlay} className='w-10 rounded-[20]'>
                            {isPlaying ? (<Pause />) : (<Play />)}
                        </Button>

                        <Button  variant={'ghost'} onClick={NextPlay} className='ml-2 rounded-[20]'><ArrowRight  /></Button>
                    </div>
                    <div className='flex items-center justify-between w-full gap-3'>
                    <p>0:00</p>
                    <Slider min={0} max={duration} step={1} value={[currentTime]} onValueChange={handleSliderChange} />
                    <p>{duration}</p>
                    </div>

                </div>

                <div className='flex gap-2 items-center w-[150px]'>
                 
                    {volume === 0 ? <Volume /> : <Volume2 />}
                    <Slider min={0} max={1} step={0.01} value={[volume]} onValueChange={handleVolumeChange}  />
                </div>

            </div>
        </>
    );
};

export default Footer;
