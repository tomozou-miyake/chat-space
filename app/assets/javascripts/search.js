$(document).on('turbolinks:load', function() {


  var search_list = $("#user-search-result");
  var member_list = $("#member-search-result");

  function appendUser(user) {
      var html = `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.name}</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${user.id} data-user-name= ${user.name}>追加</a>
                  </div>`
      search_list.append(html);
  }

  function appendMembers(name, user_id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat_group_user_8'>
                <input name='group[user_ids][]' type='hidden' value=${user_id}>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`

    member_list.append(html);
  }


  $(function() {
    $(".chat-group-form__input").on("keyup", function() {
      var input = $("#user-search-field").val();
      $(search_list).empty();
      if (input.length == 0){
        return false;
      }
        $.ajax({
          type: 'GET',
          url: '/users/',
          data: { keyword: input },
          dataType: 'json'
        })

   .done(function(users) {
    $("#user-search-result").empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
       });
     }
     else {
     }
   })
     .fail(function() {
        alert('ユーザー検索に失敗しました');
     });
    });
  });

  $(function() {
    $(document).on("click", '.user-search-add', function() {
      console.log("kontiha");
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      appendMembers(name, user_id);
    });
    $(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    });
  });
});
