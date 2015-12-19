App.ElementsCollection = function(){
  var keyCollection = {
    appTitle: 'app-title',
    page: 'page',
    projectTitle: 'project-title',
    projectItem: 'project-item',
    projectList: 'project-list',
    projectInput: 'project-input',
    projectAdd: 'project-add',
    deleteProject: 'delete-project',
    backButton: 'back-button',
    todoItem: 'todo-item',
    todoList: 'todo-list',
    todoInput: 'todo-input',
    projectHeader: 'project-header',
    projectButtons: 'project-buttons',
    deleteTodo: 'delete-todo',
    updateProjectTitle: 'update-project-title',
    cancelUpdateProjectTitle: 'cancel-update-project-title',
    todoCheckbox: 'todo-checkbox',
    showProject: 'show-project',
    message: 'message',
    messageItem: 'message-item'
  };

  function getElement(prop){
    if (keyCollection[prop] === undefined) {
      throw new ReferenceError('The property ' + prop + ' is not defined on this object');
    }
    return '[' + getString(prop) + ']';
  }

  function getString(prop){
    return App.Prefix + keyCollection[prop];
  }

  return {
    getElement: getElement,
    getString: getString
  }
};
