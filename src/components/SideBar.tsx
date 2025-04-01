'use client'

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { List, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Input } from '../ui/input';
interface Props {
    className?: string;
}

const SideBar: React.FC<Props> = () => {
    const [open, setOpen] = useState(true)
    return (
        <div className={cn('bg-neutral-900 m-3 p-2 rounded-[10] h-screen duration-200 ', !open ? 'w-16' : 'w-67')}>

            <div className={cn('p-1', open && 'flex justify-between')}>
                <div >
                    <Button variant='secondary' className='flex items-center' onClick={() => setOpen(!open)} >
                        <List size={30} />
                        {open && <p>Моя медиатека</p>}
                    </Button>
                </div>
                <div>
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

        </div>
    )
};

export default SideBar;