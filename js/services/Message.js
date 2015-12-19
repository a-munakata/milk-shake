App.Message = function(){
  var Message = {
    warn: warn,
    error: error,
    notify: notify,
    confirmation: confirmation
  };

  var Template           = App.Template(),
      ElementsCollection = App.ElementsCollection(),
      _el                = ElementsCollection.getElement;

  function add(message, props){
    var item = $(Template.get('messageItem', {
      message: message,
      level: props.level
    }));

    $(_el('message')).append(item);

    if (props.hide) {
      var timerID = hideMessage(item, props.ms);
      item.attr('data-id', timerID);
    }
  }

  function warn(message, props){
    add(message, {
      level: 'warn',
      hide: props && props.hide || true
    });
  }

  function error(message, props){
    add(message, {
      level: 'error',
      hide: props && props.hide || true
    });
  }

  function notify(message, props){
    add(message, {
      level: 'notify',
      hide: props && props.hide || true
    });
  }

  function confirmation(message, props){
    add(message, {
      level: 'notify',
      hide: props && props.hide || false
    });
  }

  function hideMessage(item, ms){
    return setTimeout(function(){
      item.fadeOut(500);
    }, ms || 2000);
  }

  /*
   EVENT LISTENERS
   */
  $(document).on({
    mouseover: function(){
      clearTimeout($(this).data('id'));
    },
    mouseout: function(){
      hideMessage($(this), 500);
    }
  }, _el('messageItem'));

  return Message;
};
