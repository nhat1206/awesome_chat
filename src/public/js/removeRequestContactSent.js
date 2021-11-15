function removeRequestContactSent(){
    $(".user-remove-request-contact-sent").unbind("click").on("click",function(){
        let targerId = $(this).data("uid");
        $.ajax({
            url:"/contact/remove-request-contact-sent",
            type: "delete",
            data: {uid: targerId},
            success: function(data){
                if(data.success){
                    $("#find-user").find(`div.user-remove-request-contact-sent[data-uid = ${targerId}]`).hide();
                    $("#find-user").find(`div.user-add-new-contact[data-uid = ${targerId}]`).css("display", "inline-block");
                    decreaseNumberNotification("noti_contact_counter",1);
                    decreaseNumberNotiContact("count-request-contact-sent");

                    $("#request-contact-sent").find(`li[data-uid = ${targerId}]`).remove();

                    socket.emit("remove-request-contact-sent",{contactId: targerId});
                }
    
            }
        });
    });        
}
socket.on("response-remove-request-contact-sent",function(user){
    $(".noti_content").find(`div[data-uid = ${user.id}]`).remove(); //remove popup
    $("ul.list-notifications").find(`li>div[data-uid = ${user.id}]`).parent().remove();

    $("#request-contact-received").find(`li[data-uid = ${user.id}]`).remove();
    
    //Xoa o modal tab yeu cau ket ban
    decreaseNumberNotiContact("count-request-contact-received");    
    
    decreaseNumberNotification("noti_contact_counter",1);
    decreaseNumberNotification("noti_counter",1);
});

$(document).ready(function(){
    removeRequestContactSent();
});
