import mongoose from "mongoose";
import bluebird from "bluebird";
require("dotenv").config();
/**
 * Connect to MongoDB
 */
let connectDB = () => {
    mongoose.Promise = bluebird;

    // mongodb://localhost:27017/awesome_chat
    // let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    let URI = `mongodb+srv://awesomechat10:awesomechat10@awesomechat.hsuap.mongodb.net/=awesomechat?retryWrites=true&w=majority`;
    
    return mongoose.connect(URI, {useMongoClient: true});
};

module.exports = connectDB;
