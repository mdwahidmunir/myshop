
import axios from 'axios';

const { VITE_BACKEND_URL, VITE_BACKEND_PORT, VITE_BACKEND_API_VERSION } = import.meta.env

const _axios = axios.create({
    baseURL: `${VITE_BACKEND_URL}:${VITE_BACKEND_PORT}` + VITE_BACKEND_API_VERSION,
});

export default _axios;