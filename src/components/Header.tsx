'use client'

import { Home, Search, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { search } from "../services/items";
import { Track } from "@prisma/client";
import { useClickAway, useDebounce } from "react-use";
import { cn } from "../lib/utils";
interface Props {
  className?: string;
}

const Header: React.FC<Props> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<Track[]>([]);

  const ref = useRef(null)
  useClickAway(ref, () => { setOpen(true) })
  const [open, setOpen] = useState(false);

  useDebounce(async () => {
    try {
      const responce = await search(searchQuery);
      setItems(responce);
    } catch (error) {
      console.log('Error-[Search]', error)
    }

  }, 150, [searchQuery])

  return (
    <div className=" sticky top-0 bg-black z-30 px-20 flex justify-between p-3">
      <div className="flex gap-5 items-center">
        <div className="bg-neutral-700 p-3 rounded-[50%]">
          <Home size={30} color="white" />
        </div>
        <div className="flex items-center">
          <Search className="absolute m-2" />
          <Input type="text" size={50} placeholder="Что хочешь включить?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setOpen(true)} className=" bg-neutral-800 text-blue-50 rounded-[10] pl-10 placeholder:text-gray-300 placeholder:text-md" />
        </div>
      </div>

      <div className={cn('absolute bg-neutral-800 p-4 rounded-[10] top-20 ', open ? 'opacity-100 visible' : 'opacity-0 invisible')}>

        <button className="absolute top-1 right-2" onClick={() => setOpen(false)}>X</button>
        {items.map((item) => (
          <div className="p-2" key={item.id}>
            <h1>{item.title}</h1>
          </div>
        ))}
      </div>

      <div className="">
        <div className="bg-neutral-700 p-3 rounded-[50%]">
          <User size={30} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
