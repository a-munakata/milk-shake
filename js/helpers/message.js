var messageID;

function message(str, ms){
  var $message = $(".message");

  var showMessage = function(str){
    $message.addClass("active");
    $message.text(str);
  };

  var hideMessage = function(ms){
    messageID = setTimeout(function(){
      $message.removeClass("active");
    }, ms || 2000);
  };

  ////////////////////////////////////

  messageID && clearTimeout(messageID);

  showMessage(str);

  if (ms == null || ms >= 0) {
    hideMessage(ms);
  }
}