const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        text: {
            type: String,
        },
        image: {
            type: String,
        }
    },
    { timestamps: true }
);

const Message = mongoose.model.Messages || mongoose.model("Messages", schema);

module.exports = Message;