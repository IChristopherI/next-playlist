'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Heart, List, Plus, Ungroup } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Input } from '../ui/input';
import { useUploadStore } from '../store/items';
import Link from 'next/link';



const SideBar: React.FC = () => {
    const [open, setOpen] = useState(true);
    const { myMusic, fetchMyPlaylist, tracks } = useUploadStore();

    useEffect(() => {
        fetchMyPlaylist();
    }, []);

    return (
        <div className={cn('bg-neutral-900 m-3 p-2 rounded-[10]  duration-200 ', !open ? 'w-16' : 'w-90')}>
            <div className={cn('p-1 gap-4', open && 'flex justify-between')}>
                <div className='mt-1'>
                    <Button variant='secondary' className='flex items-center' onClick={() => setOpen(!open)}>
                        <List size={30} />
                        {open && <p>Моя медиатека</p>}
                    </Button>
                </div>
                <div className='mt-1'>
                    <Button variant='outline' className='rounded-2xl'>
                        <Plus size={30} />
                        {open && <p>Создать</p>}
                    </Button>
                </div>
            </div>
            {open && (
                <div className='flex items-center gap-2 m-1'>
                    <Input placeholder='Искать в медиатеке' className='rounded-[5] w-40' />
                    <p className='m-1'>Недавно прослушано</p>
                </div>
            )}
            <div className='flex items-center w-full gap-4 mt-3 hover:bg-neutral-800'>
                <Link href='/collection' className='flex items-center hover:cursor-pointer hover:scale-101  transition-transform duration-200'>
                    <div className='bg-gradient-to-r from-violet-200 to-pink-200 flex items-center justify-center rounded-[5] w-10 h-12 sm:w-12 sm:h-12  shadow-md'>
                        <Heart color="#ffffff" size={30} />
                    </div>
                    {open && (
                        <div className='ml-3'>
                            <p className='text-white font-semibold text-sm sm:text-base'>Любимые треки</p>
                            <div className='flex'>
                                <Ungroup color='green' />
                                <p className='text-gray-500 text-sm'>Плейлист</p>
                            </div>
                        </div>
                    )}
                </Link>
            </div>
            <div className='flex items-center w-full gap-4 mt-3 hover:bg-neutral-800'>
                {myMusic.map((item) => (
                    <Link href={`/playlist/${item.id}`} className='flex  hover:cursor-pointer' key={item.id}>
                        <div className='bg-gradient-to-r from-violet-200 to-blue-200 flex items-center justify-center rounded-[5] w-10 h-12 sm:w-12 sm:h-12  shadow-md'>
                        </div>
                        {open && (
                            <div className='ml-3'>
                                <p className='text-white font-semibold text-sm sm:text-base'>{item.name}</p>
                                <div className='flex items-center gap-3'>
                                <p className='text-gray-500 text-sm'>Плейлист</p>
                                <p className='text-gray-500 text-sm'>{tracks.length} трека</p>
                                </div>
                            </div>
                        )}
                    </Link>
                ))
                }
            </div>
        </div>
    );
};

export default SideBar;
