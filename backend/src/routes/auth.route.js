const express = require("express")
const { handleUserSignIn, handleUserSignUp, updateProfile, checkAuth, handleLogout } = require("../controllers/auth.controller")
const protectRoute = require('../middleware/auth.middleware')


const route = express.Router();

route.post("/signup", handleUserSignUp);
route.post("/signin", handleUserSignIn);
route.post("/logout", handleLogout);

route.put("/update-profile", protectRoute, updateProfile);

route.get("/check", protectRoute, checkAuth);

module.exports = route