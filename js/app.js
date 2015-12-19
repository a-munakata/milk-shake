var App = {
  init: function(){
    var controller = new App.ProjectsController;
    controller.init();
  }
};

/*
 GLOBAL VARIABLES
 */

App.DefaultLang         = 'ja';
App.Endpoint            = 'http://localhost:3000/';
App.Prefix              = 'ms-';
App.CurrentProjectId    = '';
App.CurrentProjectTitle = '';
App.CurrentPageStatus   = 'index';

/*
 jQuery Extension
 */

$.fn.extend({
  fadeInPrepend: function(item){
    item.hide();
    this.prepend(item);
    item.fadeIn();
  },
  fadeInAppend: function(item){
    item.hide();
    this.append(item);
    item.fadeIn();
  }
});

