import { create } from "zustand";
import { getItems } from "../services/items";

export type ItemState = {
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

    fetchItems: () => Promise<void>;
}

export const useUploadStore = create<UploadStore>((set) => ({

    loading: true,
    error: false,
    items: [],

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
}))