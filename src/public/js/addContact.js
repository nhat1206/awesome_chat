function addContact(){
    $(".user-add-new-contact").bind("click",function(){
        let targerId = $(this).data("uid");
        console.log(targerId);
        $.post("/contact/add-new", {uid: targerId},function(data){
            if(data.success){
                $("#find-user").find(`div.user-add-new-contact[data-uid = ${targerId}]`).hide();
                $("#find-user").find(`div.user-remove-request-contact[data-uid = ${targerId}]`).css("display", "inline-block");
                increaseNumberNotiContact("count-request-contact-sent");
                socket.emit("add-new-contact",{contactId: targerId});
            }
        });
    });        
}

socket.on("response-add-new-contact",function(user){
    let notif = `<span data-uid="${user.id}">
                <img class="avatar-small" src="images/users/${user.avatar}" alt=""> 
                <strong>${user.username}</strong> đã gửi cho bạn một lời mời kết bạn!
                </span><br><br><br>`;
    $(".noti_content").prepend(notif);
    increaseNumberNotiContact("count-request-contact-received");    
    
    increaseNumberNotification("noti_contact_counter");
    increaseNumberNotification("noti_counter");
});
