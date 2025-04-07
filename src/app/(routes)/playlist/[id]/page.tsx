'use client';

import { useUploadStore } from '@/src/store/items';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Footer from '@/src/components/Footer';
import MusicPlayer from '@/src/components/MusicPlayer';
import Music from '@/src/components/Music';
import { Timer } from 'lucide-react';
import Loading from '@/src/components/loading';
import { Main } from 'next/document';
import MainUi from '@/src/components/MainUI';

const Playlist: React.FC = () => {
  const { fetchMyMusic, tracks, loading, error, currentSong, myMusic } = useUploadStore();
  const { id } = useParams();

  useEffect(() => {
    fetchMyMusic(Number(id));
  }, [id]);


  if (loading) {
    return <Loading />;
  }
  if (error) return <p className="text-center text-red-500">Ошибка загрузки</p>;

  return (
    <>
      <div className="max-w-[1040px] w-full bg-gradient-to-t from-gray-900 from-75% via-gray-900 via-75% to-purple-600 to-100% m-3 p-4 rounded-[10] shadow-lg">
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-start'>Плейлист</h1>
          {myMusic.map((item) => (
            <div key={item.id} className="">
              <h1 className='text-6xl'>{item.name}</h1>
            </div>
          ))}
          <h1>{tracks.length} трека</h1>
        </div>
        <table className="min-w-full  table-auto text-left text-white">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Название</th>
              <th className="px-4 py-2"><Timer /></th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((item, index) => (
              <Music show={false}
                key={index}
                id={item.id}
                index={index}
                title={item.title}
                artist={item.artist}
                duration={item.duration}
                UrlImage={item.UrlImage}

              />
            ))}

          </tbody>
        </table>
      </div>
      <MainUi />
    </>
  );
};

export default Playlist;
