import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import ChatGroupModel from "./../models/chatGroupModel";
import MessageModel from "./../models/messageModel";
import _ from "lodash";
import { transErrors } from "../../lang/vi";
import {app} from "./../config/app";

const LIMIT_CONVERSATIONS_TAKEN = 15;
const LIMIT_MESSAGE_TAKEN = 30;

let getAllConversationItems = (currentUserId) =>{
    return new Promise( async(resolve,reject) =>{
        try {
            let contacts = await ContactModel.getContacts(currentUserId,LIMIT_CONVERSATIONS_TAKEN);
            let userConversationsPromise = contacts.map(async (contact) =>{
                if (contact.contactId == currentUserId) {
                    let getUserContact =  await UserModel.getNormalUserDataById(contact.userId);
                    getUserContact.updatedAt = contact.updatedAt;
                    return getUserContact;
                }else{
                    let getUserContact = await UserModel.getNormalUserDataById(contact.contactId);
                    getUserContact.updatedAt = contact.updatedAt;
                    return getUserContact;
                }
            });

            let userConversations = await Promise.all(userConversationsPromise);
            let groupConversations = await ChatGroupModel.getChatGroups(currentUserId,LIMIT_CONVERSATIONS_TAKEN);
            let allConversations = userConversations.concat(groupConversations);
            allConversations = _.sortBy(allConversations,(item)=>{
                return -item.updatedAt;      
            });

            let allConversationsWithMessagesPromise = allConversations.map(async(conversation)=>{
                conversation = conversation.toObject();

                if(conversation.members){
                    let getMessages = await MessageModel.model.getMessagesInGroup(conversation._id,LIMIT_MESSAGE_TAKEN);
                    conversation.messages = getMessages;
                }else{
                    let getMessages = await MessageModel.model.getMessagesInPersonal(currentUserId,conversation._id,LIMIT_MESSAGE_TAKEN);
                    conversation.messages = getMessages;
                }

                return conversation;
            });

            let allConversationsWithMessages = await Promise.all(allConversationsWithMessagesPromise);
            allConversationsWithMessages = _.sortBy(allConversationsWithMessages, (item)=>{
                return -item.updatedAt;
            });
            
            resolve({
                allConversationsWithMessages: allConversationsWithMessages
            });
        } catch (error) {
            reject(error);
        }
    });
};

let addNewTextEmoji = (sender,receiverId,messageVal,isChatGroup) =>{
    return new Promise(async(resolve,reject)=>{
        try {
            if(isChatGroup){
                let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receiverId);
                if (!getChatGroupReceiver) {
                    return reject(transErrors.coversation_not_found);
                }
                let receiver = {
                    id: getChatGroupReceiver._id,
                    name: getChatGroupReceiver.name,
                    avatar: app.general_avatar_group_chat
                };

                let newMessageItem = {
                    senderId: sender.id,
                    receiverId: receiver.id,
                    conversationType: MessageModel.conversationType.GROUP,
                    messageType: MessageModel.messageType.TEXT,
                    sender: sender,
                    receiver: receiver,
                    text: messageVal,
                    createdAt: Date.now(),
                };

                let newMessage = await MessageModel.model.createNew(newMessageItem);
                await ChatGroupModel.updateWhenHasNewMessage(getChatGroupReceiver._id,getChatGroupReceiver.messageAmount + 1);
                resolve(newMessage);
            }else{
                let getUserReceiver = await UserModel.getNormalUserDataById(receiverId);
                if (!getUserReceiver) {
                    return reject(transErrors.coversation_not_found);
                }
                let receiver = {
                    id: getUserReceiver._id,
                    name: getUserReceiver.username,
                    avatar: getUserReceiver.avatar
                };
                let newMessageItem = {
                    senderId: sender.id,
                    receiverId: receiver.id,
                    conversationType: MessageModel.conversationType.PERSONAL,
                    messageType: MessageModel.messageType.TEXT,
                    sender: sender,
                    receiver: receiver,
                    text: messageVal,
                    createdAt: Date.now(),
                };
                let newMessage = await MessageModel.model.createNew(newMessageItem);
                await ContactModel.updateWhenHasNewMessage(sender.id,getUserReceiver._id);
                resolve(newMessage);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllConversationItems: getAllConversationItems,
    addNewTextEmoji: addNewTextEmoji
};
