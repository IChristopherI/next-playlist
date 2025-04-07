'use client';

import MainUi from '@/src/components/MainUI';
import Music from '@/src/components/Music';
import { useUploadStore } from '@/src/store/items';
import axios from 'axios';
import { Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  UrlImage: string;
  Url: string;
}

interface CollectionTrack {
  id: number;
  collectionId: number;
  trackId: number;
  track: Track;
}

interface Collection {
  id: number;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  tracks: CollectionTrack[];
}

const Collection: React.FC = () => {
  const { fetchMyFavorites, collections } = useUploadStore();

  useEffect(() => {
    fetchMyFavorites();
  }, []);

  return (
    <>
      <div className="max-w-[1040px] w-full bg-gradient-to-t from-gray-900 from-75% via-gray-900 via-75% to-blue-600 to-100% m-3 p-4 rounded-[10] shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <table className="min-w-full table-auto text-left text-white">
            <thead className="border-b">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Название</th>
                <th className="px-4 py-2">
                  <Timer />
                </th>
              </tr>
            </thead>
            <tbody>
              {collections.length > 0 ? (
                collections.map((collection) =>
                  collection.tracks.map((item, index) => (
                    <Music
                      show={false}
                      key={item.id}
                      id={item.track.id.toString()}
                      index={index}
                      title={item.track.title}
                      artist={item.track.artist}
                      duration={item.track.duration}
                      UrlImage={item.track.UrlImage}
                      
                    />
                  ))
                )
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    Нет данных для отображения
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MainUi />
    </>
  );
};

export default Collection;
