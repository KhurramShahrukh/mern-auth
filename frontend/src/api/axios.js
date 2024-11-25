import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
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
