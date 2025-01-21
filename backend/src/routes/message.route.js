const express = require("express");
const protectRoute = require("../middleware/auth.middleware")
const { getUsersForSidebar, getUserMessages, sendMessages } = require('../controllers/message.controller.js')

const router = express.Router();


router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getUserMessages);
router.post("/send/:id", protectRoute, sendMessages);


module.exports = router