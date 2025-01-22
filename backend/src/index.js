const express = require("express");
const authRouter = require("./routes/auth.route");
const dotenv = require("dotenv");
const connect = require("./lib/db");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const messageRouter = require("./routes/message.route");
const cors = require('cors')
const { app, server } = require('./lib/socket')

dotenv.config();
const port = process.env.PORT;
const url = process.env.MONGODB_URI;

// Connect to the database
connect(url);


// Middleware
app.use(cors({
    origin: "http://localhost:5173", //frontend url
    credentials: true
}
))
app.use(cookieParser()); // Use cookie-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

server.listen(port, () => {
    console.log("server is running on PORT:" + port);
    // connect();
});
