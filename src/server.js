import express from "express";
import ConnectDB from "./config/connectDB";
import ContactModel from "./models/contact.model";
require("dotenv").config();
let app = express();

//Connect to mongodb
ConnectDB();

app.get("/test-database",async (req,res)=>{
    try {
        let item = {
            userId: "qwe123",
            contactId: "sgsgf2424",
        }
        let contact = await ContactModel.createNew(item)
        res.send(contact);
    } catch (error) {
        console.log(err);
    }
});

app.listen(process.env.APP_PORT,process.env.APP_HOSTNAME,()=>{
    console.log(`running at ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`);
});
