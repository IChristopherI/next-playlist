import { create } from "zustand";
import { getItems } from "../services/items";

export type ItemState = {
    id: string;
    title: string;
    artist: string;
    Url: string;
    UrlImage: string;
    duration: number;
}

export interface UploadStore {
    loading: boolean;
    error: boolean;
    items: ItemState[];
    audio: HTMLAudioElement | null; //ссылка на аудио
    isPlaying: boolean;
    currentSong: ItemState | null; //детали песни
    currentTime: number; // время текущей песни

    volume: number;
    duration: number;

    fetchItems: () => Promise<void>;
    togglePlay: (id: string) => void;
    setCurrentTime: (time: number) => void;

    setVolume: (value: number) => void;
}

export const useUploadStore = create<UploadStore>((set,get) => ({
    loading: true,
    error: false,
    items: [],
    audio: null,
    isPlaying: false,
    currentSong: null,
    currentTime: 0,
    volume: 1,
    duration: 0,

    fetchItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await getItems();
            set({ items: data });
        } catch (error) {
            console.log('Error fetching items:', error);
            set({ loading: false, error: true });
        } finally {
            set({ loading: false });
        }
    },

    togglePlay: (id) => {
        set((state) => {
            const song = state.items.find((item) => item.id === id);

            if (!song) {
                console.log('Song not found');
                return state;
            }

            // Если песня уже проигрывается
            if (state.isPlaying && state.currentSong?.id === song.id && state.audio) {
                state.audio.pause();
                return {
                    isPlaying: false,
                    currentTime: state.audio.currentTime,
                };
            }

            // Если песня не проигрывается или выбрана другая песня
            const audio = state.audio || new Audio(song.Url); //создаем обьект
            audio.src = song.Url;
            audio.currentTime = state.currentTime;
            audio.play();

            audio.onended = () => {}

            audio.ontimeupdate = () => {
                if (state.isPlaying) {
                    set({ currentTime: audio!.currentTime, duration:audio.duration });
                }
            };

            return {
                audio,
                isPlaying: true,
                currentSong: song,
            };
        });


    },
    setCurrentTime(time) {
        set((state) => {
            if (state.audio) {
                state.audio.currentTime = time;
            }
            return ({ currentTime: time })
        })
    },

    setVolume(value) {
        set((state) => {
            if (state.audio) {
                state.audio.volume = value;
            }
            return ({ volume: value })
        })
    },
}));
