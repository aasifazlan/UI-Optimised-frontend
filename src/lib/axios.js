import axios from 'axios';

const api=axios.create({
    baseURL:import.meta.env.DEV
    ? "http://localhost:5173/api"
    : "https://ui-backend-1eg1.onrender.com/api"
})

export default api;