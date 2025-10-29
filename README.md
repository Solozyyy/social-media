# 🌐 Social Media App — MERN + Socket.IO

Ứng dụng mạng xã hội mini được xây dựng bằng **React (Vite)** và **Node.js (Express + MongoDB)**.  
Cho phép người dùng **đăng ký, đăng nhập, đăng bài viết, bình luận, nhắn tin realtime** thông qua **Socket.IO**.

---

## 🏗️ Cấu trúc dự án

social-media/
│
├── client/ # Frontend React + Vite
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── store/
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
│
├── server/ # Backend Express + MongoDB
│ ├── db/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── socket/
│ │ └── socket.js
│ ├── index.js
│ ├── package.json
│ └── .env
│
└── README.md

yaml
Sao chép mã

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

🧩 Công nghệ sử dụng
🎨 Frontend
⚛️ React 19 + Vite

🧰 Redux Toolkit

🌐 React Router DOM

💬 Socket.IO Client

🕒 React Timeago, jwt-decode, React Icons

⚙️ Backend
🚀 Express 5

💾 MongoDB + Mongoose

🔐 JWT Authentication

☁️ Cloudinary API

💬 Socket.IO Realtime

🧰 bcryptjs, express-fileupload, uuid
