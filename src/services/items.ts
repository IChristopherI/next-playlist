import axios from "axios";

export const getItems = async () => {
    const { data } = await axios.get('api/items');
    return data;
};

export const search = async (query: string) => {
    const { data } = await axios.get('/api/search', { params: { query } });
    return data;
}


export const fetchMysic = async (id: number) => {
    const { data } = await axios.get(`/api/playlist/${id}`);
    return data;
}


export const addMusic = async (trackId: number) => {
    const { data } = await axios.post('/api/collection', { trackId });
    return data;
}


export const getFavorites = async () => {
    const { data } = await axios.get('/api/collection');
    return data;
}