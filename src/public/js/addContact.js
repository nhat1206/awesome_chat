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
