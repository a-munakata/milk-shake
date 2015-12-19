App.Template = function(){
  function get(name, props) {
    props || (props = {});

    return {
      projectItem: '<li class=\'ProjectItem\' ms-project-item data-id=\'' + props.id + '\'>' +
        '<button class=\'ProjectItem__ShowButton\' ms-show-project>' + props.title + '</button>' +
        '<button class=\'ProjectItem__DeleteButton\' ms-delete-project>X</button>' +
        '</li>',

      newProject: '<li class=\'ProjectItem\' ms-project-add>' +
        '<input type=\'text\' class=\'ProjectItem__Input\' ms-project-input placeholder=\'' + props.title + '\'/>' +
        '</li>',

      todoItem: '<li class=\'TodoItem\' data-id=\'' + props.id + '\' ms-todo-item>' +
        '<label class=\'TodoItem__Label\'>' +
        '<input class=\'TodoItem__Checkbox\' type=\'checkbox\' ms-todo-checkbox/>' +
        '<span class=\'TodoItem__LabelText\'>' +
        props.title + '' +
        '</span>' +
        '</label>' +
        '<button class=\'TodoItem__DeleteButton\' ms-delete-todo>X</button>' +
        '</li>',

      messageItem: '<li class=\'MessageItem ' + props.level + '\' ms-message-item>' + props.message + '</li>'
    }[name]
  }

  return {
    get: get
  }
};