const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const { config } = require("dotenv");
const app = express();
const server = http.createServer(app);

config();

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

function sendMessage(receiverSocketId, message) {
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", message);
    }
}
// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connect", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });


});

module.exports = { io, app, server, getReceiverSocketId, sendMessage };
