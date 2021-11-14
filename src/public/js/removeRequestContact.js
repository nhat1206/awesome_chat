function removeRequestContact(){
    $(".user-remove-request-contact").bind("click",function(){
        let targerId = $(this).data("uid");
        $.ajax({
            url:"/contact/remove-request-contact",
            type: "delete",
            data: {uid: targerId},
            success: function(data){
                if(data.success){
                    $("#find-user").find(`div.user-remove-request-contact[data-uid = ${targerId}]`).hide();
                    $("#find-user").find(`div.user-add-new-contact[data-uid = ${targerId}]`).css("display", "inline-block");
                    decreaseNumberNotiContact("count-request-contact-sent");
                    socket.emit("remove-request-contact",{contactId: targerId});
                }
    
            }
        });
    });        
}
socket.on("response-remove-request-contact",function(user){
    $(".noti_content").find(`div[data-uid = ${user.id}]`).remove(); //remove popup
    $("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove();

    //Xoa o modal tab yeu cau ket ban
    decreaseNumberNotiContact("count-request-contact-received");    
    
    decreaseNumberNotification("noti_contact_counter");
    decreaseNumberNotification("noti_counter");
});
