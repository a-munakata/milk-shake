App.TodoFeature = function(){
  var TodoFeature = {
    create: create,
    update: update,
    destroy: destroy,
    reloadList: reloadList,
    emptyInput: emptyInput,
    toggleCheckbox: toggleCheckbox
  };

  var ElementsCollection = App.ElementsCollection(),
      Todo               = App.Todo(),
      Template           = App.Template(),
      Message            = App.Message(),
      _el                = ElementsCollection.getElement;

  function create(props){
    if ($(this).val() && $(this).val().length > 0) {
      Todo.create({
        title: $(this).val(),
        project_id: props.project_id
      }).success(function(todo){
        prepItem(todo);
        Message.notify('Successfully created a todo.');
      }).error(function(){
        Message.error('Failed to create a todo.');
      });
    }
  }

  function update(){
    Todo.update({
      id: $(this).closest(_el('todoItem')).data('id'),
      is_completed: $(this).is(':checked'),
      completed_at: $(this).is(':checked') ? Math.round($.now()/1000) : null
    }).success( toggleCheckbox.bind(this) ).error(function(){
      Message.error('Failed to update a todo.');
    });
  }

  function destroy(){
    Todo.destroy({
      id: getId.bind(this)()
    }).success(function(){
      fadeOutItem.bind(this)();
    }.bind(this)).error(function(){
      Message.error('Failed to destroy a todo.');
    });
  }

  function loadList(){
    Todo.query({
      project_id: App.CurrentProjectId
    }).success(function(todos){
      todos.forEach(function(todo){
        toggleCheckbox.bind(
          appendItem(todo).find(_el('todoCheckbox'))
        )(todo);
      });
    }).error(function(){
      Message.error('Failed to load todos.');
    });
  }

  /*
   DOM Operation
   */

  function toggleCheckbox(data){
    $(this).prop('checked', data.is_completed);
  }

  function emptyInput(){
    $(_el('todoInput')).val('');
  }

  function emptyList(){
    $(_el('todoList')).empty();
  }

  function fadeOutItem(){
    $(this).closest(_el('todoItem')).fadeOut(500);
  }

  function getId(){
    return $(this).closest(_el('todoItem')).data('id');
  }

  function reloadList(props){
    emptyList(props);
    loadList(props);
  }

  function appendItem(todo){
    return $(Template.get('todoItem', {
      title: todo.title,
      id: todo.id
    }) ).appendTo(_el('todoList'))
  }

  function prepItem(todo){
    return $(Template.get('todoItem', {
      title: todo.title, id: todo.id
    }) ).prependTo(_el('todoList'))
  }

  return TodoFeature;
};