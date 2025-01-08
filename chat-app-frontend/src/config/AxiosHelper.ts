import axios from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL as string;

export const httpClient = axios.create({
    baseURL: baseURL,
});
