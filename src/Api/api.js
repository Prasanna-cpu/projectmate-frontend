import axios from "axios";

const host=import.meta.env.VITE_APP_URL || "http://localhost:5000"

const api = axios.create({
    baseURL: host,
});

const token = localStorage.getItem('jwt');

if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.defaults.headers.post['Content-Type'] = 'application/json';

export default api;