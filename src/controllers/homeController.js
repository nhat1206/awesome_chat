import {notification,contact} from "./../services/index";

let getHome = async (req,res)=>{

    //only 10 item per time
    let notifications = await notification.getNotifications(req.user._id);

    //get amount notification unread
    let countNotifUnread = await notification.countNotifUnread(req.user._id); 

    //get contacts 10 item per time
    let contacts = await contact.getContacts(req.user._id);

    //get contact sent 10 item per time
    let contactsSent = await contact.getContactsSent(req.user._id);

    //get contact received 10 item per time
    let contactsReceived = await contact.getContactsReceived(req.user._id);

    //count contacts
    let countAllContacts = await contact.countAllContacts(req.user._id);

    let countAllContactsSent = await contact.countAllContactsSent(req.user._id);

    let countAllContactsReceived = await contact.countAllContactsReceived(req.user._id);

    return res.render("main/home/home",{
        errors: req.flash("errors"),
        success: req.flash("success"),
        user: req.user,
        notifications: notifications,
        countNotifUnread: countNotifUnread,
        contacts: contacts,
        contactsSent: contactsSent,
        contactsReceived:contactsReceived,
        countAllContacts: countAllContacts,
        countAllContactsSent: countAllContactsSent,
        countAllContactsReceived: countAllContactsReceived
    });
};

module.exports = {
    getHome: getHome
};
