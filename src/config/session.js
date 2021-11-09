import session from "express-session";
import connectMongo from "connect-mongo";
require("dotenv").config();

let MongoStore = connectMongo(session);

/**
 * This variable is where save session 
 */
let sessionStore = new MongoStore({
    url:`${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    autoReconnect: true
});

/**
 * Config session for app
 * @param app from exacly express module
 */
let config = (app)=>{
    app.use(session({
        key: process.env.SESSION_KEY,
        secret: process.env.SESSION_SECRET,
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie:{
            maxAge: 1000 * 60 * 60 * 24 //86400000s = 1 day
        } 
    }));
};

module.exports = {
    config: config,
    sessionStore: sessionStore
};
