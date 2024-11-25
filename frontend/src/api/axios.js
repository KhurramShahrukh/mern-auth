import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL
});


axiosInstance.interceptors.request.use(
    (config) => {
        const { token = "" } = JSON.parse(localStorage.getItem('user')) || {}
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
