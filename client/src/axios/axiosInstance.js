import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});


axiosInstance.interceptors.request.use(

    (config) => {
        const raw = localStorage.getItem('currentUser');
        let token = null;
        if (raw) {
            try {
                token = JSON.parse(raw)?.token ?? null;
            } catch {
                // nếu hỏng JSON -> xoá để tránh lỗi lặp
                localStorage.removeItem('currentUser');
            }
        }
        console.log("🧪 Token gửi đi:", token);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (err) => Promise.reject(err)
);

export default axiosInstance;