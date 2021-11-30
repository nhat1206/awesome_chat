import {pushSocketIdToArray,emitNotifyToArray,removeSocketIdFromArray} from "./../../helpers/socketHelper";

let userOnlineOffline = (io) =>{
    let clients = {};
    io.on("connection",(socket) =>{
        clients = pushSocketIdToArray(clients,socket.request.user._id,socket.id);
        socket.request.user.chatGroupIds.forEach(group =>{
            clients = pushSocketIdToArray(clients,group._id,socket.id);
        });
        let listUsersOnline = Object.keys(clients);
        //step1: emit to user after login or f5 page    
        socket.emit("server-send-list-users-online", listUsersOnline);
        //step 2: emit to all other user when new user online
        socket.broadcast.emit("server-send-when-new-user-online",socket.request.user._id);

        socket.on("disconnect",()=>{
            clients = removeSocketIdFromArray(clients,socket.request.user._id,socket);
            socket.request.user.chatGroupIds.forEach(group =>{
                clients = removeSocketIdFromArray(clients,group._id,socket);
            });
            //step 3: emit to all user when user offline
            socket.broadcast.emit("server-send-when-new-user-offline",socket.request.user._id);
        });
    });
};

module.exports = userOnlineOffline;
