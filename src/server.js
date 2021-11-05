import express from "express";
import ConnectDB from "./config/connectDB";
import configViewEngine from "./config/viewEngine";
require("dotenv").config();
let app = express();

//Connect to mongodb
ConnectDB();

//Config view engine
configViewEngine(app);

app.get("/",(req,res)=>{
   res.render("main/master");
});

app.get("/loginRegister",(req,res)=>{
    return res.render("auth/loginRegister");
});

app.listen(process.env.APP_PORT,process.env.APP_HOSTNAME,()=>{
    console.log(`running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`);
});
