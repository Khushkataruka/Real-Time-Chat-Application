const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const generateToken = require('../lib/util')
const cloudinary = require('../lib/cloudinary');
const { use } = require('../routes/message.route');
async function handleUserSignUp(req, res) {
    try {
        const { email, fullName, password } = req.body;

        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long." });
        }

        const isPresent = await User.findOne({ email });
        if (isPresent) {
            return res.status(409).json({ message: "Email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const encrypted_password = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            fullName,
            password: encrypted_password,
        });

        if (user) {
            const token = generateToken(user._id, res);
            return res.status(201).json(user);
        } else {
            return res.status(500).json({ message: "Failed to create user." });
        }
    } catch (e) {
        console.error("An error occurred during signup: ", e);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}

async function handleUserSignIn(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = await generateToken(user._id, res);
        return res.status(200).json(user);
    } catch (e) {
        console.error("An error occurred during login: ", e);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}


async function handleLogout(req, res) {
    try {
        // req.logout();
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out Successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



async function updateProfile(req, res) {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required." });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        if (!uploadResponse || !uploadResponse.secure_url) {
            return res.status(500).json({ message: "Failed to upload profile picture." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json(updatedUser);
    } catch (e) {
        console.error("Error updating profile: ", e);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}

async function checkAuth(req, res) {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("An Error Occured in checking Auth");
        return res.status(500).json({ message: "Internal Server error while Checking auth" });
    }
}


module.exports = {
    handleUserSignUp,
    handleUserSignIn,
    updateProfile,
    checkAuth,
    handleLogout
}