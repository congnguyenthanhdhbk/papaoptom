import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: process.env.FORSAGE_URI,
    headers: { "Content-Type": "application/json"},
    timeout: 3600
})