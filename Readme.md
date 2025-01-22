# ✨ Full Stack Realtime Chat App ✨


Highlights:

🌟 Tech stack: MERN + Socket.io + TailwindCSS + Daisy UI
🎃 Authentication && Authorization with JWT
👾 Real-time messaging with Socket.io
🚀 Online user status
👌 Global state management with Zustand
🐞 Error handling both on the server and on the client
⭐ At the end Deployment like a pro for FREE!
⏳ And much more!
Setup .env file in backend

MONGODB_URI=...
PORT=3000
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=development


Build the app
two terminals

1st terminal
1. cd backend 
2. npm start

2nd terminal
1. cd frontend
2. npm run dev

add the frontend url on origin in backend/src/lib/socket.js and backend/src/index.js in case if deployed

add the backend url on frontend/src/stores/useAuthStore and set baseUrl=backendurl
