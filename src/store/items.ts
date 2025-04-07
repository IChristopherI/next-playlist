import { create } from "zustand";
import { addMusic, fetchMysic, getFavorites, getItems } from "../services/items";
import axios from "axios";


interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  UrlImage: string;
  Url: string;
}

interface CollectionTrack {
  id: number; // ID связи между коллекцией и треком
  collectionId: number;
  trackId: number;
  track: Track; // Вложенный объект трека
}

interface Collection {
  id: number;
  name: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  tracks: CollectionTrack[]; // Массив треков
}

export type Playlist = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export type ItemState = {
  id: string;
  title: string;
  artist: string;
  Url: string;
  UrlImage: string;
  duration: number;
};

export interface UploadStore {
  loading: boolean;
  error: boolean;
  items: ItemState[];
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  currentSong: ItemState | null;
  currentTime: number;
  volume: number;
  duration: number;
  tracks: ItemState[];
  myMusic: Playlist[];
  collections: Collection[];

  fetchItems: () => Promise<void>;
  fetchMyMusic: (id: number) => Promise<void>;
  fetchMyPlaylist: () => Promise<void>;
  fetchMyFavorites: () => Promise<void>;
  addToPlaylist: (trackId: number) => Promise<void>;

  playSong: (song: ItemState) => void;
  togglePlay: (id: string) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (value: number) => void;
}


export const useUploadStore = create<UploadStore>((set, get) => ({
  loading: true,
  error: false,
  items: [],
  audio: null,
  isPlaying: false,
  currentSong: null,
  currentTime: 0,
  volume: 1,
  duration: 0,
  tracks: [],
  myMusic: [],
  myPlaylist: [],
  collections: [],

  
  playSong: (song) => {
    const prevAudio = get().audio;
    prevAudio?.pause();

    const audio = new Audio(song.Url);
    audio.volume = get().volume;
    audio.currentTime = 0;
    audio.play();

    audio.ontimeupdate = () => {
      set({
        currentTime: audio.currentTime,
        duration: audio.duration,
      });
    };

    set({
      audio,
      currentSong: song,
      isPlaying: true,
    });
  },

  togglePlay: (id) => {
    const { currentSong, isPlaying, audio, items, tracks } = get();
    const allSongs = [...items, ...tracks];
    const song = allSongs.find((item) => item.id === id);

    if (!song) return console.error("Song not found");

    if (currentSong?.id === song.id && isPlaying && audio) {
      audio.pause();
      set({ isPlaying: false });
    } else {
      get().playSong(song);
    }
  },

  setCurrentTime: (time) => {
    const audio = get().audio;
    if (audio) audio.currentTime = time;
    set({ currentTime: time });
  },

  setVolume: (value) => {
    const audio = get().audio;
    if (audio) audio.volume = value;
    set({ volume: value });
  },

  fetchItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await getItems();
      set({ items: data });
    } catch (err) {
      console.error("Error fetching items:", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  fetchMyMusic: async (id) => {
    try {
      set({ loading: true, error: false });
      const data = await fetchMysic(id);
      const tracks = data.tracks.map((item: any) => ({
        id: item.track.id,
        title: item.track.title,
        artist: item.track.artist,
        Url: item.track.Url,
        UrlImage: item.track.UrlImage,
        duration: item.track.duration,
      }));
      set({ tracks, myMusic: [data] });
    } catch (err) {
      console.error("Error fetching playlist:", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  fetchMyPlaylist: async () => {
    try {
      const response = await axios.get("/api/playlist");
      set({ myMusic: response.data });
    } catch (err) {
      console.error("Ошибка при получении плейлистов:", err);
    }
  },

  fetchMyFavorites: async () => {
    try {
      const data = await getFavorites();
      const collections = data.map((collection: any) => ({
        id: collection.id,
        name: collection.name,
        userId: collection.userId,
        createdAt: collection.createdAt,
        updatedAt: collection.updatedAt,
        tracks: collection.tracks.map((item: any) => ({
          id: item.id,
          collectionId: item.collectionId,
          trackId: item.trackId,
          track: {
            id: item.track.id,
            title: item.track.title,
            artist: item.track.artist,
            Url: item.track.Url,
            UrlImage: item.track.UrlImage,
            duration: item.track.duration,
          },
        })),
      }));
  
      set({ collections });
    } catch (err) {
      console.error("Ошибка при получении избранного:", err);
    }
  },

  addToPlaylist: async (trackId) => {
    try {
     await addMusic(trackId);
    } catch (err) {
      console.error("Ошибка при добавлении трека:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
