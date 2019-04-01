$(function(){
     function buildHTML(message){
      include_image =(message.image_url) ? `<img src="${message.image_url}">` : "";
      // if ( message.image_url ) {
      //    include_image = `<img src="${message.image_url}">`;
      //  }
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
              <div class="upper-message__user-name">
                ${message.user_name}
              </div>
              <div class="upper-message__date">
                ${message.create_date}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            ${include_image}
          </div>`

        return html;
    }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.messages').append(html);
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
       $('form')[0].reset();
     })
      .fail(function(){
        alert('エラーが出ました。確認してください');
      });
      return false;
    });
  /*ここまで作ったやつ*/

//以下、5秒ごとに自動更新する機能に関する記述

      if (location.pathname.match(/\/groups\/\d+\/messages/)) {
        setInterval(update, 5000);
      }else{
        clearInterval(update)
        return false;
      }
    function update(){
      var message_id = $('.message:last').data('message-id') || 0 ;
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { last_id: message_id },
        dataType: 'json'
      })
      .done(function(newMessages){
        var insertHTML = '';
        newMessages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML)
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('form')[0].reset();
         })
      })
      .fail(function(data) {
        alert('更新できませんでした。');
      });
  };
});
