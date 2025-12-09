import axios from "axios";

const api = axios.create({baseURL: 'http://localhost:3000/api'});

export async function fetchVariationData() {
    const response = await api.get('/variations');
    return response.data;
}

export async function fetchUserData(userId: string) {
    const response = await api.get(`/users/${userId}`);
    return response.data;
}