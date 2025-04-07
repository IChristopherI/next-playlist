'use client'

import { Home, MessageCircle, Search, User, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { search } from "../services/items";
import { Track } from "@prisma/client";
import { useClickAway, useDebounce } from "react-use";
import { cn } from "../lib/utils";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
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

  }, 100, [searchQuery])

  return (
    <div className=" sticky top-0 bg-black z-30 px-20 flex justify-between p-3">
      <div className="flex gap-5 items-center">
        <Link href="/">
          <div className="bg-neutral-800 p-3 rounded-[50%]">
            <Home size={25} color="white" />
          </div>
        </Link>
        <div className="flex items-center">
          <Search className="absolute m-2" />
          <Input type="text" size={50} placeholder="Что хочешь включить?" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setOpen(true)} className=" bg-neutral-800 text-blue-50 rounded-[10] pl-10 placeholder:text-gray-300 placeholder:text-md" />
          <X className="relative right-7 hover:cursor-pointer" onClick={() => setSearchQuery('')} />
        </div>
      </div>

      <div className={cn('absolute bg-neutral-800  p-4 rounded-[10] top-20 w-[500]', open ? 'opacity-97 visible' : 'opacity-0 invisible')}>
        <button className="absolute top-1 right-2 hover:cursor-pointer" onClick={() => setOpen(false)}>X</button>

        {items.length === 0 ? (
          <h1>Ничего не найдено</h1>
        ) : (
          items.map((item) => (
            <div className="p-2 flex justify-center gap-5  items-center" key={item.id}>
              <Image src={item.UrlImage ?? ''} height={40} width={40} alt="imgLogo" className="rounded-[10]" />
              <h1>{item.title}</h1>
            </div>
          ))
        )}
      </div>

      <div className="flex">
        <div className="bg-neutral-800 p-3 rounded-[50%]">
          <User size={25} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
