'use client'

import React, { useEffect } from "react";
import Music from "../components/Music";
import { useUploadStore } from "../store/items";
import { Clock6, Clock9, Pause, Play, Timer, TimerIcon } from "lucide-react";
import Loading from "../components/loading";
import MainUi from "../components/MainUI";
import toast from "react-hot-toast";

export default function Home() {
  const { items, loading, error, fetchItems, addToPlaylist, togglePlay, isPlaying, currentSong } = useUploadStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);


  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-red-500">Error occurred while fetching items.</div>;
  }

  const onSubmit = async (event: React.FormEvent, trackId: number) => {
    try {
      event.preventDefault();
      event.stopPropagation();
      await addToPlaylist(trackId);
      toast.success("Трек добавлен в плейлист");
    } catch (error) {
      toast.error("Ошибка добавления трека в плейлист");
    }
  };
  
  const handlePlay = () => {  
    if (!currentSong) {
      togglePlay(items[0].id);
      return;
    }
  
    if (currentSong && isPlaying) {
      togglePlay(currentSong.id); 
      return;
    }
  
    if (currentSong && !isPlaying) {
      togglePlay(currentSong.id); 
    }
  };
  

  return (
    <>
      <div className="max-w-[1040px] w-full bg-neutral-900 m-3 p-4 rounded-[10] shadow-lg">
        <div className="flex justify-between items-center m-4">
          <button onClick={handlePlay} className=' rounded-[50] bg-green-500 p-2 hover:bg-green-600'>
            {isPlaying ? (<Pause size={50} />) : (<Play size={50} />)}
          </button>

        </div>
        <table className="min-w-full  table-auto text-left text-white">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Название</th>
              <th className="px-4 py-2"><Clock9 size={23} /></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <Music show={true}
                key={index}
                id={item.id}
                index={index}
                title={item.title}
                artist={item.artist}
                duration={item.duration}
                UrlImage={item.UrlImage}
                onSubmit={(event) => onSubmit(event, Number(item.id))}
              />
            ))}
          </tbody>
        </table>
      </div>

      <MainUi />
    </>
  );
}
