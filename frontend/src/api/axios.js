import axios from 'axios';

console.log("🚀 ~ process.env.REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL)
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
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
