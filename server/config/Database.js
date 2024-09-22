const mongoose = require("mongoose");

const databaseConnect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/twitter_clone")
    .then(() => {
        console.log("MongoDB Connected!");
    }).catch((error) => {
        console.log("**Error in MongoDB connection**", error);
        process.exit(1);
    })
}

module.exports = databaseConnect