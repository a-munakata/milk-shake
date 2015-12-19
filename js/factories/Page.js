App.Page = function(){
  var Page = {
    init: init,
    get: get
  };

  var ElementsCollection = App.ElementsCollection(),
      Status             = App.CurrentPageStatus,
      _el                = ElementsCollection.getElement,
      _str               = ElementsCollection.getString;

  function init(){
    get('index');
  }
  
  function show(){
    find().show();
  }

  function hide(){
    $(_el('page')).hide();
  }

  function update(prop) {
    if (prop && Status != prop) {
      Status = prop;
    }
  }
  
  function find(){
    return $('[' + _str('page') + '=\'' + Status + '\']');
  }

  function get(prop){
    update(prop);
    hide();
    show();
  }

  return Page;
};
