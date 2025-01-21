const jwt = require("jsonwebtoken")

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,//millisecond
        httpOnly: true, //prevent XSS attacks cross-site scripting attacks
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development" //only send cookie over HTTPS
    })

    return token;
}


module.exports = generateToken;