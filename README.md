# 🌐 Social Media App — MERN + Socket.IO

Ứng dụng mạng xã hội mini được xây dựng bằng **React (Vite)** và **Node.js (Express + MongoDB)**.  
Cho phép người dùng **đăng ký, đăng nhập, đăng bài viết, bình luận, nhắn tin realtime** thông qua **Socket.IO**.

---

## 🏗️ Cấu trúc dự án
```
social-media/
🖥️ Frontend – React (client/)
client/
│
├── public/
│
├── src/
│ ├── assets/ # Hình ảnh, icon, tài nguyên tĩnh
│ ├── axios/ # Cấu hình axios cho API calls
│ ├── components/ # Thành phần UI tái sử dụng (Navbar, PostCard, ...)
│ ├── helpers/ # Hàm tiện ích (format thời gian, xử lý token, ...)
│ ├── pages/ # Các trang giao diện (Home, Login, Profile, Chat, ...)
│ ├── services/ # Dịch vụ API (userService, postService, ...)
│ ├── socket/ # Cấu hình client Socket.IO (kết nối realtime)
│ ├── store/ # Redux store + slice (userSlice, chatSlice, ...)
│ │
│ ├── App.jsx # Component chính của ứng dụng
│ ├── RootLayout.jsx # Layout gốc bao bọc các route
│ ├── index.css # CSS tổng
│ ├── main.jsx # Điểm khởi chạy React DOM
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md


⚙️ Backend – Express (server/)

server/
│
├── controllers/ # Xử lý logic cho các route (userController, postController, ...)
├── db/ # Kết nối cơ sở dữ liệu MongoDB
├── middleware/ # Middleware (xử lý lỗi, xác thực JWT, upload, ...)
├── models/ # Định nghĩa schema MongoDB (User, Post, Comment, Message, ...)
├── routes/ # Định nghĩa endpoint (userRoutes, postRoutes, commentRoutes, ...)
├── socket/ # Quản lý Socket.IO server (socket.js)
├── uploads/ # Thư mục lưu tạm file upload (nếu dùng local)
├── utils/ # Tiện ích dùng chung (hàm xử lý, constant, ...)
│
├── .env # Biến môi trường (PORT, DB_URL, JWT_SECRET, ...)
├── .gitignore
├── index.js # Điểm khởi động server chính
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Cài đặt và khởi chạy

### 1️⃣ Clone project
```bash
git clone https://github.com/Solozyyy/social-media.git
cd social-media
```
### 2️⃣ Cài đặt dependencies
Client:

```bash
cd client
npm install
```
Server:

```bash
cd ../server
npm install
```
### 3️⃣ Cấu hình môi trường
Tạo file .env trong thư mục server/:

env
```
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/
JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4️⃣ Chạy ứng dụng
Terminal 1 – Backend:

```bash
cd server
npm run dev
```
Terminal 2 – Frontend:

```bash
cd client
npm run dev
```
Mở trình duyệt tại: 👉 http://localhost:5173

### Công nghệ sử dụng

#### Frontend
⚛️ React 19 + Vite
🧰 Redux Toolkit
🌐 React Router DOM
💬 Socket.IO Client
🕒 React Timeago, jwt-decode, React Icons

#### Backend
🚀 Express 5
💾 MongoDB + Mongoose
🔐 JWT Authentication

☁️ Cloudinary API

💬 Socket.IO Realtime

🧰 bcryptjs, express-fileupload, uuid
