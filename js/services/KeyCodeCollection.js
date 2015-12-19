App.KeyCode = function(){
  var codes = {
    enter: 13,
    escape: 27
  };

  function isEnter(prop){
    return prop == codes.enter
  }

  function isEscape(prop){
    return prop == codes.escape
  }

  return {
    isEnter: isEnter,
    isEscape: isEscape
  }
};