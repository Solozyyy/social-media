import axios from "axios";
import { useSelector } from "react-redux";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});


axiosInstance.interceptors.request.use(

    (config) => {
        const currentUser = localStorage.getItem("currentUser") || null;
        const token = currentUser ? JSON.parse(currentUser).token : null;
        console.log("🧪 Token gửi đi:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (err) => Promise.reject(err)
);

export default axiosInstance;