const mongoose = require("mongoose")

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: true,
        },
        profilePic: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const User = mongoose.model.users || mongoose.model("users",schema);
module.exports = User;