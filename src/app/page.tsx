'use client'

import { useEffect } from "react";
import Footer from "../components/Footer";
import Music from "../components/Music";
import { useUploadStore } from "../store/items";
import { Timer } from "lucide-react";
import MusicPlayer from "../components/MusicPlayer";

export default function Home() {
  const { currentSong, items, loading, error, fetchItems } = useUploadStore();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error occurred while fetching items.</div>;
  }

  return (
    <>
      <div className="max-w-[1240px] w-full bg-neutral-900 m-3 p-4 rounded-[10] shadow-lg">
        <table className="min-w-full  table-auto text-left text-white">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Название</th>
              <th className="px-4 py-2"><Timer /></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <Music
                key={index}
                id={item.id}
                index={index}
                title={item.title}
                artist={item.artist}
                duration={item.duration}
                UrlImage={item.UrlImage}
                Url={item.Url}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="ml-2 right-0 bg-neutral-900  shadow-lg p-4 m-3 rounded-[10] h-screen">
        <MusicPlayer
          title={currentSong?.title ?? ''}
          artist={currentSong?.artist ?? ''}
          UrlImage={currentSong?.UrlImage ?? '/no-music.png'}
        />
      </div>

      <Footer currentSong={currentSong}/>
    </>
  );
}
