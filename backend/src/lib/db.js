const mongoose = require('mongoose')

async function connectDB(url) {
    try {
        await mongoose.connect(url)
        console.log("MongoDb Connected")
    }
    catch (err) {
        console.error("Failed to Connect MongoDb: " + err)
    }
}

module.exports=connectDB