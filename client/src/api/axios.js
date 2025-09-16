import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
    withCredentials: true, // important if Clerk or cookies
})

export default api