function addFriendsToGroup() {
    $("ul#group-chat-friends").find("div.add-user").bind("click", function() {
      let uid = $(this).data("uid");
      $(this).remove();
      let html = $("ul#group-chat-friends").find("div[data-uid=" + uid + "]").html();
  
      let promise = new Promise(function(resolve, reject) {
        $("ul#friends-added").append(html);
        $("#groupChatModal .list-user-added").show();
        resolve(true);
      });
      promise.then(function(success) {
        $("ul#group-chat-friends").find("div[data-uid=" + uid + "]").remove();
      });
    });
  };
  
  function cancelCreateGroup() {
    $("#btn-cancel-group-chat").bind("click", function() {
      $("#groupChatModal .list-user-added").hide();
      if ($("ul#friends-added>li").length) {
        $("ul#friends-added>li").each(function(index) {
          $(this).remove();
        });
      }
    });
  };

function callSearchFriends(element){
    if(element.which === 13 || element.type === "click"){
        let keyword = $("#input-search-friends-to-add-group-chat").val();
        let regexKeyword = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
        
        if (!keyword.length) {
            alertify.notify("Chưa nhập nội dung tìm kiếm","error",7);
            return false;
        }

        if (!regexKeyword.test(keyword)) {
            alertify.notify("Lỗi kí tự tìm kiếm,chỉ cho phép chữ cái và số ,cho phép khoảng trống","error",7);
            return false;
        }

        $.get(`/contact/search-friends/${keyword}`,function(data){
            $("ul#group-chat-friends").html(data);

            // Thêm người dùng vào danh sách liệt kê trước khi tạo nhóm trò chuyện
            addFriendsToGroup();

            // Action hủy việc tạo nhóm trò chuyện
            cancelCreateGroup();
        });        
    }
};

function callCreateGroupChat(){
    $("#btn-create-group-chat").unbind("click").on("click",function(){
        let countUsers = $("ul#friends-added").find("li");
        if(countUsers.length < 2){
            alertify.notify("Vui lòng chọn bạn bè để thêm vào nhóm,tối thiểu 2 người.","error",7);
            return false;
        }

        let groupChatName = $("#input-name-group-chat").val();
        let regexGroupChatName = new RegExp(/^[\s0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/);
        if(!regexGroupChatName.test(groupChatName) || groupChatName.length < 5 || groupChatName.length > 30){
            alertify.notify("Vui lòng nhập tên nhóm ,từ 5 đến 30 kí tự và không chứa kí tự đặc biệt.","error",7)
            return false;
        }

        let arrayIds = [];
        $("ul#friends-added").find("li").each(function(index,item){
            arrayIds.push({"userId":$(item).data("uid")});
        });

        Swal.fire({
            title: `Bạn có chắc chắn muốn tạo nhóm &nbsp; ${groupChatName} ?`,
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#2ECC71",
            cancelButtonColor: "#ff7675",
            confirmButtonText: "Xác nhận",
            cancelButtonText: "Hủy"
          }).then((result) => {
            if(!result.value){
                return false;
            }
            $.post("/group-chat/add-new",{
                arrayIds: arrayIds,
                groupChatName: groupChatName
            },function(data){
                console.log(data.groupChat);
            })
            .fail(function(response){
                alertify.notify(response.responseText,"error",7)
            });
          });
    });
};

$(document).ready(function(){
    $("#input-search-friends-to-add-group-chat").bind("keypress", callSearchFriends);
    $("#btn-search-friends-to-add-group-chat").bind("click", callSearchFriends);
    callCreateGroupChat();
});
