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

export async function loginService(formData) {
    try {
        console.log(formData, "formData");
        const { data } = await axiosInstance.post('/api/users/login', { ...formData });
        return data;
    } catch (error) {
        // Hiển thị lỗi chi tiết từ server (nếu có)
        console.error("login error:", error.response?.data || error.message);
        throw error;
    }
}

export async function createPostService(formData) {
    try {
        console.log(formData, "formData");
        const { data } = await axiosInstance.post('/api/posts/create', formData);
        return data;
    } catch (error) {
        // Hiển thị lỗi chi tiết từ server (nếu có)
        console.error("createPost error:", error.response?.data || error.message);
        throw error;
    }
}

export async function getAllPostsService() {
    try {
        const { data } = await axiosInstance.get('/api/posts');
        return data;
    } catch (error) {
        // Hiển thị lỗi chi tiết từ server (nếu có)
        console.error("getAllPosts error:", error.response?.data || error.message);
        throw error;
    }
}

export async function getPostByIdService(id) {
    try {
        const { data } = await axiosInstance.get(`/api/posts/${id}`);
        return data;
    } catch (error) {
        // Hiển thị lỗi chi tiết từ server (nếu có)
        console.error("getPostById error:", error.response?.data || error.message);
        throw error;
    }
}


export async function getUserById(id) {
    try {
        const { data } = await axiosInstance.get(`/api/users/${id}`);
        return data;
    } catch (error) {
        // Hiển thị lỗi chi tiết từ server (nếu có)
        console.error("getUserById error:", error.response?.data || error.message);
        throw error;
    }
}

export async function LikeDislikePostService(id) {
    try {
        const { data } = await axiosInstance.get(`/api/posts/like-dislike/${id}`);
        return data;
    } catch (error) {
        // Hiển thị lỗi chi tiết từ server (nếu có)
        console.error("LikeDislikePostService error:", error.response?.data || error.message);
        throw error;
    }
}

export async function createBookmarkService(postId) {
    try {
        const { data } = await axiosInstance.get(`/api/posts/${postId}/bookmark`);
        return data;
    } catch (error) {
        // Hiển thị lỗi chi tiết từ server (nếu có)
        console.error("createBookmarkService error:", error.response?.data || error.message);
        throw error;
    }
}

export async function createCommentService(postId, comment) {
    try {
        //const data = await axiosInstance.post(`/api/comments/${postId}`, { comment })
        const { data } = await axiosInstance.post(`/api/comments/${postId}`, { comment })
        return data
    } catch (error) {
        console.error("createComment error:", error.response?.data || error.message);
        throw error;
    }
}

export async function deleteCommentService(commentId) {
    try {
        const { data } = await axiosInstance.delete(`/api/comments/${commentId}`)
        return data
    } catch (error) {
        console.error("createComment error:", error.response?.data || error.message);
        throw error;
    }
}

export async function getBookmarksService() {
    try {
        const { data } = await axiosInstance.get(`/api/users/bookmarks`)
        return data
    } catch (error) {
        console.error("getBookmarksService error:", error.response?.data || error.message);
        throw error;
    }
}

export async function changeAvatarService(formData) {
    try {
        const { data } = await axiosInstance.post('/api/users/avatar', formData)
        return data
    } catch (error) {
        console.error("changeAvatarService error:", error.response?.data || error.message);
        throw error;
    }
}