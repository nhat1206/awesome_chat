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
                }
    
            }
        });
    });        
}
