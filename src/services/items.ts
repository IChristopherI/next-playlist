import axios from "axios";

export const getItems = async () => {
    const { data } = await axios.get('api/items');
    return data;
};

export const search = async (query:string) => {
    const {data} = await axios.get('api/search', {params:{query}});
    return data;
}