import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
import initRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import configSession from "./config/session";
import passport from "passport";
//import pem from "pem";
//import https from "https";
require("dotenv").config();

let app = express();

//Connect to mongodb
ConnectDB();

// Config Session
configSession(app);

//Config view engine
configViewEngine(app);

//Enable post data request
app.use(bodyParser.urlencoded({extended:true}));

//Enable Flash message
app.use(connectFlash());

//Config passport js
app.use(passport.initialize());
app.use(passport.session());

//Init all routes
initRoutes(app);


app.listen(process.env.APP_PORT,process.env.APP_HOSTNAME,()=>{
    console.log(`running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`);
});

//facebook login 
// pem.config({
//     pathOpenSSL: 'C:\\Program Files\\OpenSSL-Win64\\bin\\openssl'
//   })
// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
//     if (err) {
//       throw err;
//     }
//     let app = express();

//     //Connect to mongodb
//     ConnectDB();
    
//     // Config Session
//     configSession(app);
    
//     //Config view engine
//     configViewEngine(app);
    
//     //Enable post data request
//     app.use(bodyParser.urlencoded({extended:true}));
    
//     //Enable Flash message
//     app.use(connectFlash());
    
//     //Config passport js
//     app.use(passport.initialize());
//     app.use(passport.session());
    
//     //Init all routes
//     initRoutes(app);

//     https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(process.env.APP_PORT,process.env.APP_HOSTNAME,()=>{
//         console.log(`running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`);
//     });
//   });
