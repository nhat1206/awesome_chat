import mongoose from "mongoose";

let Schema = mongoose.Schema;

let MessageSchema = new Schema({
    senderId: String,
    receiverId: String,
    conversationType: String,
    messageType: String,
    sender:{
        id:String,
        name:String,
        avatar:String
    },
    receiver:{
        id:String,
        name:String,
        avatar:String
    },
    text: String,
    file:{data: Buffer, contentType: String, fileName:String},
    createdAt: {type: Number, default:Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}    
});

MessageSchema.statics = {
    
    createNew(item) {
        return this.create(item);
    },

    getMessagesInPersonal(senderId,receiverId,limit){
        return this.find({
            $or: [
                {$and: [
                    {"senderId":senderId},
                    {"receiverId":receiverId}
                ]},
                {$and: [
                    {"receiverId":senderId},
                    {"senderId":receiverId}
                ]}
            ]
        }).sort({"createdAt": -1}).limit(limit).exec();
    },

    getMessagesInGroup(receiverId,limit){
        return this.find({"receiverId":receiverId}).sort({"createdAt": -1}).limit(limit).exec();
    },

    readMoreMessagesInPersonal(senderId,receiverId,skip,limit){
        return this.find({
            $or: [
                {$and: [
                    {"senderId":senderId},
                    {"receiverId":receiverId}
                ]},
                {$and: [
                    {"receiverId":senderId},
                    {"senderId":receiverId}
                ]}
            ]
        }).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
    },

    readMoreMessagesInGroup(receiverId,skip,limit){
        return this.find({"receiverId":receiverId}).sort({"createdAt": -1}).skip(skip).limit(limit).exec();
    },
};

const MESSAGE_CONVERSATION_TYPE = {
    PERSONAL: "personal",
    GROUP: "group"
};

const MESSAGE_TYPE = {
    TEXT: "text",
    IMAGE: "image",
    FILE: "file"
};

module.exports = {
    model:  mongoose.model("message",MessageSchema),
    conversationType: MESSAGE_CONVERSATION_TYPE,
    messageType: MESSAGE_TYPE
};
