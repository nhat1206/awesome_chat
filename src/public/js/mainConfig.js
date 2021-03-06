/**
 * Created by https://trungquandev.com's author on 25/02/2018.
 */

const socket = io();

function nineScrollLeft() {
  $('.left').niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
}

function resizeNineScrollLeft(){
  $(".left").getNiceScroll().resize();
}

function nineScrollRight(divId) {
  $(`.right .chat[data-chat= ${divId}]`).niceScroll({
    smoothscroll: true,
    horizrailenabled: false,
    cursorcolor: '#ECECEC',
    cursorwidth: '7px',
    scrollspeed: 50
  });
  $(`.right .chat[data-chat= ${divId}]`).scrollTop($(`.right .chat[data-chat= ${divId}]`)[0].scrollHeight);
}

function enableEmojioneArea(divId) {
  $(`#write-chat-${divId}`).emojioneArea({
    standalone: false,
    pickerPosition: 'top',
    filtersPosition: 'bottom',
    tones: false,
    autocomplete: false,
    inline: true,
    hidePickerOnBlur: true,
    search: false,
    shortnames: false,
    events: {
      keyup: function(editor, event) {
        $(`#write-chat-${divId}`).val(this.getText());
      },
      click: function(){
        textAndEmojiChat(divId);
        typingOn(divId);
      },
      blur: function(){
        //tat chuc nang nguoi dung dang tro chuyen
        typingOff(divId);
      }
    },
  });
  $('.icon-chat').bind('click', function(event) {
    event.preventDefault();
    $('.emojionearea-button').click();
    $('.emojionearea-editor').focus();
  });
}

function spinLoaded() {
  $('.master-loader').css('display', 'none');
}

function spinLoading() {
  $('.master-loader').css('display', 'block');
}

function ajaxLoading() {
  $(document)
    .ajaxStart(function() {
      spinLoading();
    })
    .ajaxStop(function() {
      spinLoaded();
    });
}

function showModalContacts() {
  $('#show-modal-contacts').click(function() {
    $(this).find('.noti_contact_counter').fadeOut('slow');
  });
}

function configNotification() {
  $('#noti_Button').click(function() {
    $('#notifications').fadeToggle('fast', 'linear');
    $('.noti_counter').fadeOut('slow');
    return false;
  });
  $(".main-content").click(function() {
    $('#notifications').fadeOut('fast', 'linear');
  });
}

function gridPhotos(layoutNumber) {
  $(".show-images").unbind("click").on("click",function(){
    let href = $(this).attr("href");
    let modalImageId = href.replace("#", "");
    let originDataImage = $(`#${modalImageId}`).find("div.modal-body").html();

    let countRows = Math.ceil($(`#${modalImageId}`).find("div.all-images>img").length / layoutNumber);
    let layoutStr = new Array(countRows).fill(layoutNumber).join("");
    $(`#${modalImageId}`).find("div.all-images").photosetGrid({
      highresLinks: true,
      rel: "withhearts-gallery",
      gutter: "2px",
      layout: layoutStr,
      onComplete: function() {
        $(`#${modalImageId}`).find(".all-images").css({
          "visibility": "visible"
        });
        $(`#${modalImageId}`).find(".all-images a").colorbox({
          photo: true,
          scalePhotos: true,
          maxHeight: "90%",
          maxWidth: "90%"
        });
      }
    });

    //B???t s??? ki???n ????ng modal image
    $(`#${modalImageId}`).on('hidden.bs.modal', function () {
      $(this).find("div.modal-body").html(originDataImage);
    })
  });
}

function flashMasterNotify(){
  let notify = $(".master-success-message").text();
  if (notify.length) {
    alertify.notify(notify,"success",7);
  }
}

function changeTypeChat(){
  $("#select-type-chat").bind("change",function(){
    let optionSelected = $("option:selected",this);
    optionSelected.tab("show");

    if ($(this).val() === "user-chat") {
      $(".create-group-chat").hide();
    }else{
      $(".create-group-chat").show();
    }
  });
}

function changeScreenChat(){
  $(".room-chat").unbind("click").on("click",function(){
    let divId = $(this).find("li").data("chat");
    $(".person").removeClass("active");
    $(`.person[data-chat=${divId}]`).addClass("active");
    $(this).tab("show");

    nineScrollRight(divId);

    // B???t emoji, tham s??? truy???n v??o l?? id c???a box nh???p n???i dung tin nh???n
    enableEmojioneArea(divId);

    //bat lang nghe DOM cho viec lang nghe hinh anh
    imageChat(divId);

    //b???t l???ng nghe DOM cho vi???c nh???n t???p
    attachmentChat(divId);
  });
}

function convertEmoji(){
    $(".convert-emoji").each(function() {
        var original = $(this).html();
        var converted = emojione.toImage(original);
        $(this).html(converted);
    });
};

function bufferToBase64(buffer){
  return btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ""));
};

function notYetConversation(){
  if (!$("ul.people").find("a").length) {
    Swal.fire({
      title: `B???n ch??a c?? b???n b?? ? H??y t??m ki???m cu???c tr?? chuy???n!`,
      type: "info",
      showCancelButton: true,
      confirmButtonColor: "#2ECC71",
      confirmButtonText: "X??c nh???n",
    }).then((result) => {
        $("#contactsModal").modal("show");
      });
  }
}

$(document).ready(function() {
  // Hide s??? th??ng b??o tr??n ?????u icon m??? modal contact
  showModalContacts();

  // B???t t???t popup notification
  configNotification();

  // C???u h??nh thanh cu???n
  nineScrollLeft();

  // Icon loading khi ch???y ajax
  ajaxLoading();

  // Hi???n th??? h??nh ???nh grid slide trong modal t???t c??? ???nh, tham s??? truy???n v??o l?? s??? ???nh ???????c hi???n th??? tr??n 1 h??ng.
  // Tham s??? ch??? ???????c ph??p trong kho???ng t??? 1 ?????n 5
  gridPhotos(5);

  //Flash message ??? m??n h??nh master
  flashMasterNotify();

  //Thay doi kieu tro chuyen
  changeTypeChat();

  //Thay doi man hinh chat
  changeScreenChat();

  //convert cac unicode thanh hinh anh
  convertEmoji();

  //click vao phan tu dau tien khi load trang
  if ($("ul.people").find("a").length) {
    $("ul.people").find("a")[0].click();
  }
});
