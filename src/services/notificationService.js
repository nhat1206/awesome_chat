import NotificationModel from "./../models/notificationModel";
import UserModel from "./../models/userModel";

/**
 * get notification when refresh
 * 10item per time
 * @param {string} currentUserId 
 * @param {number} limit 
 */
let getNotifications = (currentUserId,limit = 10) =>{
    return new Promise(async (resolve,reject) =>{
        try {
            let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId,limit);
            
            let getNotifContents = notifications.map(async (notification) =>{
                let sender = await UserModel.findUserById(notification.senderId);
                return NotificationModel.contents.getContent(notification.type,notification.isRead,sender._id,sender.username,sender.avatar);

            });
            resolve(await Promise.all(getNotifContents));
        } catch (error) {   
            reject(error);
        }
    });
};
let countNotifUnread = (currentUserId) =>{
    return new Promise(async (resolve,reject) =>{
        try {
            let notificationsUnread = await NotificationModel.model.countNotifUnread(currentUserId);
            resolve(notificationsUnread);
        } catch (error) {   
            reject(error);
        }
    });
};


module.exports = {
    getNotifications: getNotifications,
    countNotifUnread: countNotifUnread
};
