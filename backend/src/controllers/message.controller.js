const { model } = require('mongoose');
const User = require('../models/user.model')
const Message = require('../models/message.model.js')
const cloudinary = require('../lib/cloudinary');
const { getReceiverSocketId, sendMessage } = require('../lib/socket.js');
const { Socket } = require('socket.io');
async function getUsersForSidebar(req, res) {
    try {
        const id = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: id } }).select("-password");

        return res.status(200).json(filteredUsers)

    } catch (e) {
        console.error("Error in Getting Users for SideBar: " + e);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

async function getUserMessages(req, res) {
    try {
        const myId = req.user._id;
        const { id: userTochatId } = req.params;

        const messages = await Message.find(
            {
                $or: [
                    { senderId: myId, receiverId: userTochatId },
                    { senderId: userTochatId, receiverId: myId }
                ]
            }
        );
        return res.status(200).json(messages);
    }
    catch (e) {
        console.error("Error in getting Messages: " + e);
        return res.status(500).json({ message: "An Error Occured While Fetching Messages" });
    }
}

async function sendMessages(req, res) {
    try {
        const senderId = req.user._id;
        const { id: receiverId } = req.params;
        const { text, image } = req.body;

        let imageUrl;
        if (image) {
            //upload base64 image to cloudinary
            const upload = await cloudinary.uploader.upload(image);
            imageUrl = upload.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        //todo:
        //real time web sockets here socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        sendMessage(receiverSocketId, newMessage);

        return res.status(201).json(newMessage);
    }
    catch (e) {
        console.log("An Error Occured in Sending Messages " + e);
        return res.status(500).json({ message: e.message })
    }
}

module.exports = {
    getUsersForSidebar,
    getUserMessages,
    sendMessages
}