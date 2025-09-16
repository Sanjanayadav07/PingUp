# 🌐 PingUp - Real-Time Social App

A modern **real-time social networking and messaging app** where users can connect, chat, share posts, and receive instant notifications. 🚀  

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Clerk](https://img.shields.io/badge/Clerk-Authentication-orange)
![Inngest](https://img.shields.io/badge/Inngest-Events-blueviolet)

---
## ✨ Features

- 🔑 **Authentication & Authorization** with Clerk  
- 📝 **Create and share posts** with media support  
- 📖 **Stories feature** like Instagram  
- 💬 **Real-time messaging** with text & image support  
- 🔔 **Instant notifications** via **Server-Sent Events (SSE)**  
- 🤝 **Connections system** (follow/connect users)  
- 📱 **Responsive UI** built with React & TailwindCSS  

---
## 📂 Project Structure
```
PingUp/
│── backend/ # Express + MongoDB backend
│ ├── configs/ # Database, multer, imagekit, etc.
│ │ ├── db.js
│ │ ├── multer.js
│ │ └── imageKit.js
│ │
│ ├── controllers/ # Controllers (User, Post, Message, etc.)
│ │ ├── userController.js
│ │ ├── postController.js
│ │ ├── storyController.js
│ │ └── messageController.js
│ │
│ ├── middlewares/ # Auth, error handlers
│ │ └── auth.js
│ │
│ ├── models/ # MongoDB models
│ │ ├── User.js
│ │ ├── Post.js
│ │ ├── Story.js
│ │ └── Message.js
│ │
│ ├── routes/ # API routes
│ │ ├── userRoutes.js
│ │ ├── postRoutes.js
│ │ ├── storyRoutes.js
│ │ └── messageRoutes.js
│ │
│ ├── inngest/ # Event-driven functions
│ │ └── index.js
│ │
│ ├── server.js # Main Express app
│ └── .env # Environment variables
│
│── frontend/ # React + Vite frontend
│ ├── src/
│ │ ├── assets/ # Images, dummy data
│ │ ├── components/ # UI components (Notification, Navbar, etc.)
│ │ ├── features/ # Redux slices (user, messages, connections)
│ │ ├── pages/ # App pages (Feed, Messages, Profile, etc.)
│ │ ├── api/ # Axios instance
│ │ ├── App.jsx # Main App
│ │ └── main.jsx # Entry point
│ │
│ └── vite.config.js
│
│── README.md
│── package.json
```
---

## 🛠️ Tech Stack
**Frontend**  
- ⚛️ React + Vite  
- 🗂️ Redux Toolkit  
- 🎨 TailwindCSS  
- 🔑 Clerk Auth  

**Backend**  
- 🟢 Node.js + Express  
- 🍃 MongoDB + Mongoose  
- 📡 SSE (Server-Sent Events) for real-time messages  
- ⚡ Inngest for background jobs  

---

## 🖥️ Live Demo & Preview
[ Live](https://ping-up-eight-weld.vercel.app/)

## 🚀 Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ping-up.git
cd ping-up
```
### 2️⃣ Setup Backend
```
cd server
npm install
npm run dev
```
### 3️⃣ Setup Frontend
```
cd client
npm install
npm run dev
```
### 🤝 Contributing

Contributions are welcome!

- Fork the repo

- Create a new branch

- Commit your changes

- Open a pull request
 ### 📜 License

This project is licensed under the MIT License
---

## 💡 Built With

❤️ by [Sanjana Yadav](https://github.com/your-username)  
🔗 Connect with me: [LinkedIn](https://linkedin.com/in/your-username) 


