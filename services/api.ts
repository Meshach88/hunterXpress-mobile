import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    // baseURL: "http://localhost:3000/api", // change when deployed
    // baseURL: "https://hunterxpress-backend.onrender.com/api", // change when deployed
    baseURL: "https://hunter-xpress-backend.vercel.app/api", // change when deployed
});

// Attach token automatically if logged in
api.interceptors.request.use(async(config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;
