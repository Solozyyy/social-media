import axiosInstance from "../axios/axiosInstance";

export async function registerService(formData) {
    try {
        console.log(formData, "formData");
        const { data } = await axiosInstance.post('/api/users/register', { ...formData });
        return data;
    } catch (error) {
        // Hiển thị lỗi chi tiết từ server (nếu có)
        console.error("Register error:", error.response?.data || error.message);
        throw error;
    }
}