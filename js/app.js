var App = {
  ENDPOINT: "http://localhost:3000/",
  init: function(){
    var controller = new App.ProjectsController;
    controller.init();
  },
  message: function(str, ms){
    var messageID;
    var $message = $("[ms-message]");

    function showMessage(str){
      $message.addClass("active");
      $message.text(str);
    }

    function hideMessage(ms){
      messageID = setTimeout(function(){
        $message.removeClass("active");
      }, ms || 2000);
    }

    ////////////////////////////////////

    showMessage(str);

    // なんかここおかしい
    messageID && clearTimeout(messageID);

    if (ms == null || ms >= 0) {
      hideMessage(ms);
    }

    $message.on("click", function(){
      hideMessage(0);
    });
  },
  templates: templates = function(name, props) {
    props || (props = {});

    return {
      projectItem: "<li class='ProjectItem' ms-project-item data-id='" + props.id + "'>" +
        "<button class='ProjectItem__ShowProject' ms-show-project>" + props.title + "</button>" +
        "<button class='ProjectItem__DeleteProject' ms-delete-project>X</button>" +
        "</li>",

      newProject: "<li class='ProjectItem' ms-new-project-item>" +
        "<input type='text' class='ProjectItem__CreateProject' ms-project-input placeholder='" + props.title + "'/>" +
        "</li>",

      todoItem: "<li class='TodoItem' data-id='" + props.id + "' ms-todo-item>" +
        "<label>" +
        "<input class='TodoItem__Checkbox' type='checkbox' ms-todo-checkbox/>" +
        "<span class='TodoItem__Label'>" +
        props.title + "" +
        "</span>" +
        "</label>" +
        "</li>"
    }[name]
  }
};

