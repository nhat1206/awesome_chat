import mongoose from "mongoose";

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status:{type: Boolean, default:false},
    createdAt: {type: Number, default:Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}    
});

ContactSchema.statics = {
    createNew(item) {
        return this.create(item);
    },

    /**
     * Tìm bản ghi liên quan đến user
     * @param {String} userId 
     */    
    findAllByUser(userId){
        return this.find({
            $or: [
                {"userId": userId},
                {"contactId": userId}
            ]
        }).exec();
    },


    /**
     * Kiểm tra user có tồn tại hay không
     * @param {string} userId 
     * @param {string} contactId 
     */
    checkExists(userId, contactId){
        return this.findOne({
            $or: [
                {$and: [
                    {"userId": userId},
                    {"contactId": contactId}
                ]},
                {$and: [
                    {"userId":contactId},
                    {"contactId": userId}
                ]}
            ]
        }).exec();
    },

    removeRequestContact(userId, contactId){
        return this.remove({
            $and: [
                {"userId":userId},
                {"contactId": contactId}
            ]
        }).exec();
    },

    /**
     * get contact by userid and limit
     * @param {string} userId 
     * @param {number} limit 
     * @returns 
     */
    getContacts(userId, limit){
        return this.find({
            $and: [
                {$or: [
                    {"userId":userId},
                    {"contactId":userId}
                ]},
                {"status":true}
            ]
        }).sort({"createdAt": -1}).limit(limit).exec();
    },

    /**
     * get contactSent by userid and limit
     * @param {string} userId 
     * @param {number} limit 
     * @returns 
     */
     getContactsSent(userId, limit){
        return this.find({
            $and: [
                {"userId":userId},
                {"status":false}
            ]
        }).sort({"createdAt": -1}).limit(limit).exec();
    },

    /**
     * get contactReceived by userid and limit
     * @param {string} userId 
     * @param {number} limit 
     * @returns 
     */
     getContactsReceived(userId, limit){
        return this.find({
            $and: [
                {"contactId":userId},
                {"status":false}
            ]
        }).sort({"createdAt": -1}).limit(limit).exec();
    },

    /**
     * count contact by userid and limit
     * @param {string} userId 
     * @returns 
     */
     countAllContacts(userId){
        return this.count({
            $and: [
                {$or: [
                    {"userId":userId},
                    {"contactId":userId}
                ]},
                {"status":true}
            ]
        }).exec();
    },

    /**
     * count contactSent by userid and limit
     * @param {string} userId 
     * @returns 
     */
     countAllContactsSent(userId){
        return this.count({
            $and: [
                {"userId":userId},
                {"status":false}
            ]
        }).exec();
    },

    /**
     * count contactReceived by userid and limit
     * @param {string} userId 
     * @returns 
     */
     countAllContactsReceived(userId){
        return this.count({
            $and: [
                {"contactId":userId},
                {"status":false}
            ]
        }).exec();
    },
};

module.exports = mongoose.model("contact",ContactSchema);
